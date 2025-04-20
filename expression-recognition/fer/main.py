import cv2
from fer import FER

detector = FER()

# cap = cv2.VideoCapture(0) 
cap = cv2.VideoCapture(1) # Use 0 for built-in webcam, 1 for external webcam

while True:
    ret, frame = cap.read()
    
    if not ret:
        print("Failed to grab frame")
        break
    
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    emotion, score = detector.top_emotion(frame_rgb)
    
    if emotion is not None:
        x, y, w, h = detector.detect_emotions(frame_rgb)[0]['box']
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(frame, f"{emotion}: {score:.2f}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    
    cv2.imshow('Emotion Recognition (Press "q" to quit)', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
