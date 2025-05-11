# Pulse Health

Pulse Health is a web application designed to provide users with easy access to healthcare services, including telemedicine consultations, an AI-powered chatbot, and information about nearby hospitals and clinics.

## Features

* **Telemedicine Services**: Connect with healthcare professionals from the comfort of your home.
* **AI Chatbot**: Get instant answers to your health queries with our AI assistant, which utilizes the **Gemini model**. The chatbot's frontend is built using **Streamlit**, providing a user-friendly interface.
* **Nearby Hospitals**: Find hospitals and clinics based on your location using an integrated map feature.
* **User-Friendly Interface**: A clean and responsive design for an optimal user experience.

## Technologies Used

* **React** – Frontend library for building UI
* **Bootstrap** – CSS framework for responsive design
* **FontAwesome** – Icon library (minimal usage)
* **Google Maps API** – For hospital location mapping
* **Gemini Model** – Advanced AI for chatbot responses
* **Streamlit** – For building the chatbot frontend

## Installation

To run this project locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/pulse-health.git
cd pulse-health

# 2. Install dependencies
npm install

# 3. Start the development server
npm run start
```

Then open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
Pulse Health/
│
├── index.html                 # Main landing page with map and navigation
│
├── /images/                   # Folder containing images used in the UI
│   └── image.png              # Example image shown in the homepage
│
├── /BMI calculator/           # BMI Buddy feature
│   └── index.html             # BMI calculator web page
│
├── /about_us_page/            # About Us section
│   └── index.html             # Info about the Pulse Health platform
│
├── /scripts/                  # JavaScript files for maps, hospital search, etc.
│   └── map.js                 # Handles hospital search and map logic
│
├── /styles/                   # CSS styling for the app
│   └── main.css
│
├── README.md                  # Project documentation
└── ...
```

## Map Integration

The **Nearby Hospitals** feature utilizes the **Google Maps API** to provide users with a visual map of hospitals and clinics in their area.

* **User Location**: Uses the browser's Geolocation API when users click "Use My Location".
* **Hospital Fetching**: Retrieves hospitals based on the user's coordinates.
* **Map Display**: Centers the map on the user and marks nearby hospitals.
* **Hospital Details**: Clicking a marker opens a modal with contact info and address.
* **Responsive Design**: Optimized for both desktop and mobile screens.

## Chatbot Integration

The **AI Chatbot** assists users with health-related queries:

* **Gemini Model**: Delivers context-aware and accurate answers.
* **Streamlit Frontend**: Interactive, fast-loading chatbot UI.
* **User Queries**: Can handle a wide variety of health questions.

## Usage

* Navigate using the navbar.
* Click **Start Consultation** to begin a telemedicine session.
* Use **Nearby Hospitals** to locate hospitals based on your current location or manual search.
* Open the **AI Chatbot** to ask health questions and get instant answers.

## Contributing

Contributions are welcome!
If you have suggestions or new feature ideas, feel free to open an issue or submit a pull request.

## License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more details.
