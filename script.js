async function loadGoogleMaps() {
    try {
        // console.log("📡 Fetching API key from backend at https://map-backend-sjr2.onrender.com/get-api-key");

        const response = await fetch("https://map-backend-sjr2.onrender.com/get-api-key");  

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.apiKey) {
            throw new Error("API key not received from server");
        }
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${data.apiKey}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;

        document.body.appendChild(script);

    } catch (error) {
        console.error("❌ Error fetching API key:", error);
    }
}

let map, service, userMarker, hospitalMarkers = [];

function initMap() {

    // Default location: New Delhi, India
    const defaultLocation = { lat: 28.6139, lng: 77.2090 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: defaultLocation,
    });

    // Initialize Places Service
    service = new google.maps.places.PlacesService(map);
}

// Get user's current location and update map
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(userLocation);
                map.setZoom(15);

                if (userMarker) {
                    userMarker.setMap(null);
                }

                userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "You are here",
                    icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                // Enable searching after location is set
                document.getElementById("search-btn").disabled = false;
            },
            (error) => {
                console.error("❌ Error getting location:", error);
                alert("Unable to retrieve your location. Please allow location access.");
            }
        );
    } else {
        alert("❌ Geolocation is not supported by this browser.");
    }
}

// Search nearby hospitals (1-2 km range)
async function findNearbyHospitals() {
    if (!userMarker) {
        alert("❌ Please allow location access first!");
        return;
    }

    const location = userMarker.getPosition();
    const latitude = location.lat();
    const longitude = location.lng();

    try {
        const response = await fetch(`https://map-backend-sjr2.onrender.com/api/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const hospitals = await response.json();

        // Clear old markers and table
        hospitalMarkers.forEach(marker => marker.setMap(null));
        hospitalMarkers = [];
        const tableBody = document.getElementById("hospital-table-body");
        tableBody.innerHTML = ""; // Clear table before adding new rows

        for (const hospital of hospitals) {
            const marker = new google.maps.Marker({
                position: { lat: hospital.geometry.location.lat, lng: hospital.geometry.location.lng },
                map: map,
                title: hospital.name,
                icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            });

            hospitalMarkers.push(marker);

            // Fetch contact details and address using Place Details API
            let contactNumber = "N/A";
            let address = "N/A";
            let distance = calculateDistance(latitude, longitude, hospital.geometry.location.lat, hospital.geometry.location.lng);

            try {
                const detailsResponse = await fetch(`https://map-backend-sjr2.onrender.com/api/place-details?place_id=${hospital.place_id}`);
                if (detailsResponse.ok) {
                    const detailsData = await detailsResponse.json();
                    contactNumber = detailsData.result.formatted_phone_number || "N/A";
                    address = detailsData.result.formatted_address || "N/A";
                }
            } catch (error) {
                console.error("❌ Error fetching hospital details:", error);
            }

            // Add row to table
            const row = `<tr onclick="showHospitalDetails('${hospital.name}','${contactNumber}', '${address}', ${hospital.geometry.location.lat}, ${hospital.geometry.location.lng})">
                <td>${hospital.name}</td>
                <td>${contactNumber}</td>
                <td>${address}</td>
                <td>${distance} km</td>
            </tr>`;
            tableBody.innerHTML += row;
        }

        if (hospitals.length === 0) {
            alert("⚠️ No hospitals found within 2 km!");
        }
    } catch (error) {
        console.error("❌ Error fetching nearby hospitals:", error);
        alert("❌ Failed to search nearby hospitals!");
    }
}

// Function to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
}


// Function to display hospital details in modal
function showHospitalDetails(name,contact, address, lat, lng) {
    document.getElementById("modal-name").textContent = name;
    // document.getElementById("modal-type").textContent = type;
    // document.getElementById("modal-specialization").textContent = specialization;
    document.getElementById("modal-contact").textContent = contact;
    document.getElementById("modal-address").textContent = address;

    // Add event listener to redirect button
    document.getElementById("redirect-btn").onclick = function () {
        if (userMarker) {
            const userLocation = userMarker.getPosition();
            const googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat()},${userLocation.lng()}/${lat},${lng}`;
            window.open(googleMapsUrl, "_blank");
        } else {
            alert("Please allow location access first!");
        }
    };

    let hospitalModal = new bootstrap.Modal(document.getElementById("hospitalModal"));
    hospitalModal.show();
}

// Add event listeners to table rows
document.getElementById("hospital-table-body").addEventListener("click", function (event) {
    const row = event.target.closest("tr");
    if (!row || row.children.length < 4) return; // Ignore clicks outside valid rows

    const name = row.children[0].textContent;
    // const type = row.children[1].textContent;
    // const specialization = row.children[2].textContent;
    const contact = row.children[3].textContent;

    // Find hospital details from existing markers
    const hospital = hospitalMarkers.find(marker => marker.getTitle() === name);
    if (hospital) {
        const lat = hospital.getPosition().lat();
        const lng = hospital.getPosition().lng();
        showHospitalDetails(name, contact, address, lat, lng);
    }
});



function sortTable(colIndex) {
  const table = document.querySelector(".table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"))
    .filter(row => !row.querySelector("td[colspan]")); // Skip placeholder row

  const th = table.querySelectorAll("th")[colIndex];
  const ascending = th.getAttribute("data-sort") !== "asc";
  th.setAttribute("data-sort", ascending ? "asc" : "desc");

  rows.sort((a, b) => {
    const cellA = a.children[colIndex].textContent.trim().toLowerCase();
    const cellB = b.children[colIndex].textContent.trim().toLowerCase();

    const isNumeric = !isNaN(cellA) && !isNaN(cellB);
    if (isNumeric) {
      return ascending ? parseFloat(cellA) - parseFloat(cellB) : parseFloat(cellB) - parseFloat(cellA);
    } else {
      return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  rows.forEach(row => tbody.appendChild(row));
}



// Load Google Maps script on page load
window.onload = loadGoogleMaps;
