import time
from audio_scoring import analyze_audio
import os

def main():
    file = "3_pauses.wav"
    current_dir = os.path.dirname(os.path.abspath(__file__))
    audio_path = os.path.join(current_dir, f"data/{file}")
    
    if not os.path.isfile(audio_path):
        raise FileNotFoundError(f"Audio file not found at path: {audio_path}")

    print(f"📥 Starting audio analysis for {file}. Please wait...")
    start_time = time.time()

    results = analyze_audio(audio_path)

    end_time = time.time()
    duration = end_time - start_time

    print("===== Audio Analysis Results =====\n")
    for feature, data in results.items():
        print(f"{feature}: {data['Score']}/10.0")
        print(f"Feedback: {data['Feedback']}\n")

    print(f"Analysis completed in {duration:.2f} seconds.")

if __name__ == "__main__":
    main()
