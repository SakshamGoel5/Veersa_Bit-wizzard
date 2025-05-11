from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# FastAPI app instance
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins; replace with frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to query Gemini for chatbot responses
def get_response_from_gemini(prompt: str) -> str:
    """Send prompt to Gemini model and get the response."""
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("Missing GOOGLE_API_KEY in environment")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text.strip()

# Pydantic model to parse incoming JSON data
class QueryRequest(BaseModel):
    question: str

# Chatbot endpoint
@app.post("/chat/")
async def chat(request: QueryRequest):
    question = request.question
    response_text = get_response_from_gemini(question)
    return JSONResponse(content={"response": response_text})

# Root endpoint to check if the server is running
@app.get("/")
def read_root():
    return {"message": "Welcome to the general chatbot API!"}
