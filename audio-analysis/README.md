## To Run
1. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the FastAPI server:
   ```bash
    uvicorn main:app --reload --port 8000
    ```
3. Access the API documentation at:
   ```
   http://localhost:8000/docs
   ```
4. Use the `/analyse-audio` endpoint to analyze audio files. You can upload a file directly through the API documentation interface.

