import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import uvicorn
import os

# -------------------------
# Load Dataset
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "qa_dat.json")

with open(DATA_PATH, "r", encoding="utf-8") as f:
    qa_data = json.load(f)

questions = [item["question"].lower() for item in qa_data]  # convert to lowercase
answers = [item["answer"] for item in qa_data]

# -------------------------
# Train TF-IDF Vectorizer
# -------------------------
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(questions)

# -------------------------
# Initialize FastAPI
# -------------------------
app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # update to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Input Schema
# -------------------------
class Query(BaseModel):
    question: str

# -------------------------
# Utility: Check for math expressions
# -------------------------
def is_math_expression(text: str) -> bool:
    allowed_chars = "0123456789+-*/(). "
    return all(c in allowed_chars for c in text.strip())

# -------------------------
# Root endpoint
# -------------------------
@app.get("/")
def root():
    return {"message": "Welcome to my Portfolio API! Use /chat endpoint to chat."}

# -------------------------
# Chat endpoint
# -------------------------
@app.post("/chat")
def chat(query: Query):
    user_input = query.question.strip()
    
    if not user_input:
        return {"answer": "Please type something so I can assist you! ✨", "confidence": 1.0}

    if is_math_expression(user_input):
        try:
            result = eval(user_input)
            return {"answer": f"The result is: {result}", "confidence": 1.0}
        except Exception:
            return {"answer": "Sorry, I couldn't evaluate that expression.", "confidence": 1.0}

    user_vec = vectorizer.transform([user_input.lower()])
    similarity = cosine_similarity(user_vec, X)
    best_idx = similarity.argmax()
    best_answer = answers[best_idx]
    confidence = similarity[0][best_idx]

    if confidence < 0.1:
        best_answer = (
            "I'm not sure about that. You can ask me things like:<br>"
            "- Hello / Hi<br>"
            "- What is your name?<br>"
            "- Who created you?<br>"
            "- What services do you offer?<br>"
            "- How can I contact you?<br>"
            "- What are your working hours?<br>"
            "- Tell me about AI<br>"
            "- Tell me a joke<br>"
            "- Use me as a Calculator<br>"
            "- Bye / Quit"
        )

    best_answer_html = best_answer.replace("\n", "<br>")
    return {"answer": best_answer_html, "confidence": float(confidence)}

# -------------------------
# Run locally
# -------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
