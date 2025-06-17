from transformers import pipeline
from responses.positive import positive_responses
from responses.negative import negative_responses
from responses.fear import fear_responses
from responses.angry import angry_responses
import pprint

def get_input_string(value):
  return f"Q - {value['question']}\n\nA - {value['answer']}\n\n"

def main():
  print("📥 Starting sentiment analysis. Please wait...")
  data = [get_input_string(angry_responses[0])]
  
  # DEFAULT POSITIVE/NEGATIVE MODEL 
  # sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english", device=-1)
  
  # roBERTa MODEL
  # LABEL_0 = "Negative", LABEL_1 = "Neutral", LABEL_2 = "Positive"
  # sentiment_pipeline = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment", device=-1)
  
  # EMOTION MODEL
  sentiment_pipeline = pipeline("sentiment-analysis", model="bhadresh-savani/distilbert-base-uncased-emotion", device=-1, return_all_scores=True)
  response = sentiment_pipeline(data)
  pprint.pprint(response)
  
  # sentiment_pipeline(data)
  # print("===== Sentiment Analysis Results =====\n")
  # for text, result in zip(data, sentiment_pipeline(data)):
  #   print(f"Text: {text}")
  #   print(f"Label: {result['label']}, Score: {result['score']:.4f}\n")
  print("Sentiment analysis completed.")

if __name__ == "__main__":
  main()
  