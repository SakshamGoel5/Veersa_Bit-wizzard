# Pulse Health ⛑️
Pulse Health is a web application designed to provide users with easy access to healthcare services, including telemedicine consultations, an AI-powered chatbot, and information about nearby hospitals and clinics.

## Features

- *Telemedicine Services*: Connect with healthcare professionals from the comfort of your home.
- *AI Chatbot*: Get instant answers to your health queries with our AI assistant, which utilizes the Gemini model for enhanced query resolution. The chatbot's frontend is built using Streamlit, providing a user-friendly interface for interaction.
- *Nearby Hospitals*: Find hospitals and clinics based on your location using an integrated map feature.
- *User -Friendly Interface*: A clean and responsive design for an optimal user experience.

## Technologies Used

- *React*: A JavaScript library for building user interfaces.
- *Bootstrap*: A CSS framework for responsive design.
- *FontAwesome*: For icons (reduced usage for a cleaner look).
- *Google Maps API*: For displaying maps and locating nearby hospitals.
- *Gemini Model*: An advanced AI model used for resolving user queries in the chatbot.
- *Streamlit*: A framework for building the frontend of the chatbot, allowing for quick and interactive web applications.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pulse-health.git
   cd pulse-health
2. Install the dependencies:
    npm install
3. Start the development server:
    go live
    Open your browser and navigate to http://localhost:3000

### Project Structure
Pulse Health/
│
├── index.html                 # Main landing page with map and navigation
├── /images/                   # Folder containing images used in the UI
│   └── image.png              # Example image shown in the homepage
│
├── /BMI calculator/          # BMI Buddy feature
│   └── index.html            # BMI calculator web page
│
├── /about_us_page/           # About Us section
│   └── index.html            # Info about the MediHub platform
│
├── /scripts/                 # JavaScript files for maps, hospital search, etc.
│   └── map.js                # Handles hospital search and map logic
│  
│
├── /styles/                  #CSS 
│   └── main.css             
│
├── README.md                 # Project documentation
└── ...

### Map Integration
The Nearby Hospitals feature utilizes the Google Maps API to provide users with a visual representation of hospitals and clinics in their vicinity. Here’s how it works:

User Location: The application requests the user's location using the browser's Geolocation API. When the user clicks the "Use My Location" button, the app retrieves their current coordinates.

Fetching Nearby Hospitals: Once the user's location is obtained, the application makes a request to a backend service (or a third-party API) to fetch a list of nearby hospitals based on the user's coordinates.

Displaying the Map: The Google Maps API is used to render a map on the page. The map is centered on the user's location, and markers are placed on the map to indicate the locations of nearby hospitals.

Hospital Information: Users can click on the markers to view more information about each hospital, such as contact details and address. This information is displayed in a modal for easy access.

Responsive Design: The map and hospital information table are designed to be responsive, ensuring a seamless experience on both desktop and mobile devices.

### Chatbot Integration
The AI Chatbot feature is designed to assist users with their health-related queries. Here’s how it works:

Gemini Model: The chatbot utilizes the Gemini model, an advanced AI model that provides accurate and context-aware responses to user queries.

Streamlit Frontend: The frontend of the chatbot is built using Streamlit, which allows for a quick and interactive user interface. Users can type their questions and receive instant responses from the AI.

User Interaction: The chatbot is designed to handle a variety of health-related questions, making it a valuable resource for users seeking information.

### Usage
Navigate through the application using the navbar.
Use the "Start Consultation" button to access telemedicine services.
Click on "Nearby Hospitals" to find hospitals based on your location. You can use the "Use My Location" button to automatically find nearby hospitals or search manually.
Interact with the AI chatbot to get answers to your health queries.
Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
