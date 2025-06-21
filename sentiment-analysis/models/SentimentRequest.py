from pydantic import BaseModel

class SentimentRequest(BaseModel):
    question: str
    answer: str