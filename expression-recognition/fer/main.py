import cv2
from fer import FER
import speech_recognition as sr
import asyncio

detector = FER()
recognizer = sr.Recognizer()
mic = sr.Microphone()

cap = cv2.VideoCapture(1)  # Use 0 for built-in webcam, 1 for external webcam

speech_detected = False
speech_detection_running = False


def detect_speech_sync():
    """Detects if speech is present (blocking)."""
    global speech_detected, speech_detection_running
    speech_detection_running = True
    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        print("Listening for speech...")
        try:
            audio = recognizer.listen(source, timeout=5)
            recognizer.recognize_google(audio)
            print("Speech detected!")
            speech_detected = True
        except sr.WaitTimeoutError:
            print("No speech detected (timeout).")
        except sr.UnknownValueError:
            print("Speech detected but not understood.")
            speech_detected = True
        except sr.RequestError as e:
            print(f"Speech recognition error: {e}")


async def detect_speech_async():
    """Runs speech detection in a separate thread."""
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, detect_speech_sync)


async def main_loop():
    global speech_detected, speech_detection_running

    while True:
        ret, frame = cap.read()

        if not ret:
            print("Failed to grab frame")
            break

        # If speech was detected, process emotion detection
        if speech_detected:
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = detector.detect_emotions(frame_rgb)

            if results:
                top_result = results[0]
                emotion, score = detector.top_emotion(frame_rgb)
                x, y, w, h = top_result["box"]
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    f"{emotion}: {score:.2f}",
                    (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    (0, 255, 0),
                    2,
                )

        cv2.imshow('Emotion Recognition (Press "q" to quit)', frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

        # Start speech detection if needed
        if not speech_detected and not speech_detection_running:
            asyncio.create_task(detect_speech_async())

        await asyncio.sleep(0.1)  # Slight delay to reduce CPU usage

    cap.release()
    cv2.destroyAllWindows()


# Run the main loop
asyncio.run(main_loop())
