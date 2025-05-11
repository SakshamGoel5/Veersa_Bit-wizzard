import streamlit as st
import requests

# API URL (Update this URL with your backend API endpoint)
API_URL = "https://chatbotbackend-1-9yy2.onrender.com/chat/"

# Streamlit app configuration
st.set_page_config(page_title="Chatbot", page_icon="🤖", layout="centered")

# Title of the app
st.title("Chat with Pulse Health 💊")

# Display instructions
st.markdown("### 😊 Hi! How are you feeling today? I'm here to listen and support you. 💙")

# Input box for the user to type the question
user_input = st.text_input("You: ", "")

# Display the response from the chatbot
if user_input:
    # Send the user input to the FastAPI backend
    try:
        response = requests.post(API_URL, json={"question": user_input})
        response_data = response.json()

        # Show the bot's response
        if response.status_code == 200 and "response" in response_data:
            st.write("HealthBOT:  " + response_data["response"])
        else:
            st.write("HealthBOT: Sorry, I couldn't process your request.You need to consult the doctor")
    except Exception as e:
        st.write(f"Error: {str(e)}")

# Display the footer
st.markdown("---")
st.markdown("Made by Pulse Health ⛑️.")
