from deepface import DeepFace
import cv2

# cap = cv2.VideoCapture(0) # 0 for default camera
cap = cv2.VideoCapture(1) # 1 for external camera

while True:
    print("Running:")
    ret, frame = cap.read()
    if not ret:
        break

    try:
        result = DeepFace.analyze(frame, actions=["emotion"], enforce_detection=False)

        dominant_emotion = result[0]["dominant_emotion"]
        emotions = result[0]["emotion"]

        y = 30
        for emotion, score in emotions.items():
            cv2.putText(
                frame,
                f"{emotion}: {score:.2f}",
                (10, y),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 255),
                2,
            )
            y += 20

        cv2.putText(
            frame,
            f"Dominant: {dominant_emotion}",
            (10, y + 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 100, 255),
            2,
        )

    except Exception as e:
        print("Error:", e)

    cv2.imshow("Expression Detector", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
