from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import whisper
import shutil
import tempfile

app = FastAPI()
model = whisper.load_model("base")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/transcribe/")
async def transcribe_video(file: UploadFile = File(...)):
    if not file.filename.endswith((".mp4", ".mkv", ".mov", ".webm")):
        raise HTTPException(status_code=400, detail="Invalid file type.")

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_video_path = Path(tmpdir) / file.filename
        with tmp_video_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = model.transcribe(str(tmp_video_path))
        transcript = result["text"]

        transcripts_dir = Path("transcripts")
        transcripts_dir.mkdir(exist_ok=True)
        transcript_path = transcripts_dir / (tmp_video_path.stem + "_transcript.txt")
        transcript_path.write_text(transcript, encoding="utf-8")

        return FileResponse(
            transcript_path, media_type="text/plain", filename=transcript_path.name
        )
