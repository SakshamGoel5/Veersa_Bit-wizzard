from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# FastAPI app instance
app = FastAPI()

# Configure the Gemini API client
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("Missing GOOGLE_API_KEY in environment")
genai.configure(api_key=api_key)

# Simple medical knowledge base (This is just an example. You can expand this or use an API)
medical_conditions = {
    "cold": {
        "symptoms": ["sore throat", "runny nose", "cough", "sneezing", "congestion"],
        "advice": "Rest, stay hydrated, and take over-the-counter medications like ibuprofen for relief."
    },
    "flu": {
        "symptoms": ["fever", "chills", "body aches", "fatigue", "sore throat"],
        "advice": "Get plenty of rest, drink fluids, and use pain relievers. Consider seeing a doctor if symptoms worsen."
    },
    "headache": {
        "symptoms": ["headache", "light sensitivity", "nausea", "dizziness"],
        "advice": "Rest in a quiet, dark room, stay hydrated, and take over-the-counter pain relievers. Seek medical attention if it persists."
    }
}


# Function to query Gemini for chatbot responses
def get_response_from_gemini(prompt: str) -> str:
    """Send prompt to Gemini model and get the response."""
    medical_keywords = ["cold", "flu", "headache", "cough", "fever", "sore throat","runny nose", "congestion", "nausea", "dizziness", "fatigue"]
    if any(keyword in prompt.lower() for keyword in medical_keywords):
        # Check for conditions in our simple medical knowledge base
        for condition, info in medical_conditions.items():
            if condition in prompt.lower():
                return f"It sounds like you might have {condition}. Here are some common symptoms: {', '.join(info['symptoms'])}. Advice: {info['advice']}"
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text.strip()

# Create a Pydantic model for the input query
class QueryRequest(BaseModel):
    question: str

# General chatbot API route
@app.post("/chat/")
async def chat(request: QueryRequest):
    # Extract the question from the request
    question = request.question
    
    # Get response from Gemini API
    response_text = get_response_from_gemini(question)
    
    # Return the chatbot's text response
    return JSONResponse(content={"response": response_text})

# Simple root route to confirm the server is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the general chatbot API!"}
