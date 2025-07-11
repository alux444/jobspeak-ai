from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from models.SentimentRequest import SentimentRequest
from utils.get_input_string import get_input_string

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === MODEL SETUP ===
# DEFAULT POSITIVE/NEGATIVE MODEL 
# sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english", device=-1)

# roBERTa MODEL
# LABEL_0 = "Negative", LABEL_1 = "Neutral", LABEL_2 = "Positive"
# sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment", device=-1)

# EMOTION MODEL (selected)
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    device=-1,
    top_k=None,
)

@app.post("/sentiment-analysis")
async def analyse_sentiment(payload: SentimentRequest):
    try:
        input_text = get_input_string(payload.model_dump())
        response = sentiment_pipeline([input_text])
        return {"input": input_text, "analysis": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
