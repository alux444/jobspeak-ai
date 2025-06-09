import whisper
from pathlib import Path

def transcribe_video(video_path: Path):
    if not video_path.exists():
        print(f"❌ File not found: {video_path}")
        return

    print("📥 Loading Whisper model...")
    model = whisper.load_model("base")

    print(f"🔁 Transcribing '{video_path}'...")
    result = model.transcribe(str(video_path))

    transcript = result["text"]

    output_path = video_path.with_name(video_path.stem + "_transcript.txt")
    output_path.write_text(transcript, encoding="utf-8")

    print(f"✅ Transcription saved to: {output_path}")

if __name__ == "__main__":
    video_file_path = Path("videos") / "video.mp4"
    transcribe_video(video_file_path)