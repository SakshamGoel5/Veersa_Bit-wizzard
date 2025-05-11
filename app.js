export function displayHospitals(places, map) {
    const listContainer = document.getElementById("hospital-list");
    listContainer.innerHTML = ""; // Clear previous results

    // Sort places by distance
    places.sort((a, b) => a.geometry.location.lat() - b.geometry.location.lat());

    places.forEach(place => {
        const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
        });

        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${place.name}</strong><br>📍 ${place.vicinity} <br>📞 ${place.formatted_phone_number || "N/A"}`;
        listContainer.appendChild(listItem);
    });
}
