from deepface import DeepFace
import cv2
from pathlib import Path

# Path to your video
video_path = Path("videos/demo.mp4")

if not video_path.exists():
    raise FileNotFoundError(f"Video not found: {video_path}")

cap = cv2.VideoCapture(video_path.as_posix())
if not cap.isOpened():
    raise RuntimeError(f"Could not open video: {video_path}")

# Accumulator for emotions
emotion_totals = {}
frame_count = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    try:
        result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)
        emotions = result[0]["emotion"]

        # Accumulate emotion scores
        for emotion, score in emotions.items():
            emotion_totals[emotion] = emotion_totals.get(emotion, 0) + score

        frame_count += 1

    except Exception as e:
        print(f"Error processing frame {frame_count + 1}: {e}")

cap.release()

# Write summary to file
if frame_count > 0:
    with open("emotions_summary.txt", "w") as f:
        f.write(f"Processed {frame_count} frames\n\n")
        for emotion, total in emotion_totals.items():
            avg = total / frame_count
            f.write(f"{emotion}: {avg:.2f}\n")
    print("Averages written to emotions_summary.txt")
else:
    print("No frames processed.")
