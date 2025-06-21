running this needs ffmpeg installed system-wide, `brew install ffmpeg` for mac.

## To Run
1. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the FastAPI server:
   ```bash
    uvicorn main:app --reload --port 8002
    ```
3. Access the API documentation at:
    ```
    http://localhost:8002/docs
    ```
4. Use the `/transcribe` endpoint to transcribe audio files. You can upload a file directly through the API documentation interface or send a POST request with audio data.