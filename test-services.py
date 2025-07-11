#!/usr/bin/env python3
"""
Test script to verify all backend services are working correctly
"""

import requests
import json
import time

# Service URLs
SERVICES = {
    "transcriber": "http://localhost:8002",
    "audio-analysis": "http://localhost:8000", 
    "sentiment-analysis": "http://localhost:8001",
    "backend": "http://localhost:3000"
}



def load_test_video():
    """Load the real test video file from media folder"""
    try:
        with open("media/test-recording.webm", "rb") as f:
            return f.read()
    except FileNotFoundError:
        print("❌ test-recording.webm not found in media folder")
        return None
    except Exception as e:
        print(f"❌ Error loading test video: {e}")
        return None

def test_health_endpoints():
    """Test health endpoints for all services"""
    print("Testing health endpoints...")
    
    for service_name, base_url in SERVICES.items():
        try:
            response = requests.get(f"{base_url}/health", timeout=5)
            if response.status_code == 200:
                print(f"✅ {service_name}: Healthy")
            else:
                print(f"❌ {service_name}: Unhealthy (Status: {response.status_code})")
        except requests.exceptions.RequestException as e:
            print(f"❌ {service_name}: Connection failed - {e}")

def test_transcription_service():
    """Test transcription service with the real test video file"""
    print("\nTesting transcription service...")
    
    # Load the real test video file
    video_data = load_test_video()
    if video_data is None:
        print("❌ Cannot test transcription service without test video file")
        return
    
    try:
        files = {"file": ("test-recording.webm", video_data, "video/webm")}
        response = requests.post(f"{SERVICES['transcriber']}/transcribe/", files=files, timeout=60)
        
        if response.status_code == 200:
            print("✅ Transcription service: Working")
            transcription_text = response.text
            print(f"   Response: {transcription_text[:100]}...")
            return transcription_text
        else:
            print(f"❌ Transcription service: Failed (Status: {response.status_code})")
            print(f"   Error: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Transcription service: Connection failed - {e}")
        return None

def test_sentiment_service():
    """Test sentiment analysis service"""
    print("\nTesting sentiment analysis service...")
    
    test_data = {
        "question": "Tell me about yourself",
        "answer": "I am a software developer with 5 years of experience."
    }
    
    try:
        response = requests.post(
            f"{SERVICES['sentiment-analysis']}/sentiment-analysis",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            print("✅ Sentiment analysis service: Working")
            result = response.json()
            print(f"   Input: {result.get('input', 'N/A')}")
        else:
            print(f"❌ Sentiment analysis service: Failed (Status: {response.status_code})")
            print(f"   Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Sentiment analysis service: Connection failed - {e}")

def test_audio_analysis_service():
    """Test audio analysis service with the real test video file and transcription"""
    print("\nTesting audio analysis service...")
    
    # Load the real test video file
    video_data = load_test_video()
    if video_data is None:
        print("❌ Cannot test audio analysis service without test video file")
        return
    
    test_transcription = "This is a test transcription for audio analysis."
    
    try:
        files = {"file": ("test-recording.webm", video_data, "video/webm")}
        data = {"transcription": test_transcription}
        
        # Combine files and data for multipart form
        response = requests.post(
            f"{SERVICES['audio-analysis']}/analyse-audio/", 
            files=files,
            data=data,
            timeout=60
        )
        
        if response.status_code == 200:
            print("✅ Audio analysis service: Working")
            result = response.json()
            print(f"   Results: {list(result.get('results', {}).keys())}")
            return result
        else:
            print(f"❌ Audio analysis service: Failed (Status: {response.status_code})")
            print(f"   Error: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Audio analysis service: Connection failed - {e}")
        return None

def test_full_workflow():
    """Test the complete workflow: transcription -> analysis"""
    print("\nTesting complete workflow...")
    
    # Load the real test video file
    video_data = load_test_video()
    if video_data is None:
        print("❌ Cannot test workflow without test video file")
        return
    
    try:
        # Step 1: Test transcription
        print("   Step 1: Transcription...")
        files = {"file": ("test-recording.webm", video_data, "video/webm")}
        trans_response = requests.post(f"{SERVICES['transcriber']}/transcribe/", files=files, timeout=60)
        
        if trans_response.status_code == 200:
            print("   ✅ Transcription successful")
            actual_transcription = trans_response.text
            print(f"   📝 Actual transcription: {actual_transcription[:100]}...")
            # Use the actual transcription for analysis
            edited_transcription = actual_transcription
        else:
            print(f"   ❌ Transcription failed: {trans_response.status_code}")
            print(f"   Error: {trans_response.text}")
            return
        
        # Step 2: Test audio analysis with actual transcription
        print("   Step 2: Audio analysis...")
        audio_files = {"file": ("test-recording.webm", video_data, "video/webm")}
        audio_data = {"transcription": edited_transcription}
        
        audio_response = requests.post(
            f"{SERVICES['audio-analysis']}/analyse-audio/", 
            files=audio_files,
            data=audio_data,
            timeout=60
        )
        
        if audio_response.status_code == 200:
            print("   ✅ Audio analysis successful")
            audio_result = audio_response.json()
            print(f"   📊 Audio scores: {list(audio_result.get('results', {}).keys())}")
            # Show some actual scores
            for feature, data in audio_result.get('results', {}).items():
                print(f"      {feature}: {data.get('Score', 'N/A')}/10")
        else:
            print(f"   ❌ Audio analysis failed: {audio_response.status_code}")
            print(f"   Error: {audio_response.text}")
        
        # Step 3: Test sentiment analysis with actual transcription
        print("   Step 3: Sentiment analysis...")
        sentiment_data = {
            "question": "Tell me about yourself",
            "answer": edited_transcription
        }
        
        sentiment_response = requests.post(
            f"{SERVICES['sentiment-analysis']}/sentiment-analysis",
            json=sentiment_data,
            headers={"Content-Type": "application/json"},
            timeout=60
        )
        
        if sentiment_response.status_code == 200:
            print("   ✅ Sentiment analysis successful")
            sentiment_result = sentiment_response.json()
            print(f"   📊 Sentiment input: {sentiment_result.get('input', 'N/A')[:100]}...")
            # Show sentiment analysis results
            if 'analysis' in sentiment_result and sentiment_result['analysis']:
                for emotion in sentiment_result['analysis'][0]:
                    print(f"      {emotion['label']}: {emotion['score']:.3f}")
        else:
            print(f"   ❌ Sentiment analysis failed: {sentiment_response.status_code}")
            print(f"   Error: {sentiment_response.text}")
        
        print("   ✅ Complete workflow test finished")
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Workflow test failed: {e}")

def main():
    print("🔍 Testing Backend Services")
    print("=" * 50)
    
    # Wait a moment for services to be ready
    print("Waiting for services to be ready...")
    time.sleep(2)
    
    # Test all services
    test_health_endpoints()
    test_transcription_service()
    test_sentiment_service()
    test_audio_analysis_service()
    test_full_workflow()
    
    print("\n" + "=" * 50)
    print("✅ Testing complete!")

if __name__ == "__main__":
    main() 