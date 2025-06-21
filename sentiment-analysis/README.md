## To Run
1. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the FastAPI server:
   ```bash
    uvicorn main:app --reload --port 8001
    ``` 
3. Access the API documentation at:
   ```
   http://localhost:8001/docs
   ```
4. Use the `/sentiment-analysis` endpoint to analyse text. You can upload a file directly through the API documentation interface or send a POST request with text data.