#!/usr/bin/env python3
"""
Test script to verify all backend services are working correctly
"""

import requests
import json
import time
import argparse
import sys

# Service URLs
SERVICES = {
    "transcriber": "http://localhost:8002",
    "audio-analysis": "http://localhost:8000",
    "sentiment-analysis": "http://localhost:8001",
    "backend": "http://localhost:3000",
}


def load_test_video():
    """Load the real test video file from media folder"""
    try:
        with open("test-recording.webm", "rb") as f:
            return f.read()
    except FileNotFoundError:
        print("❌ test-recording.webm not found in tests folder")
        return None
    except Exception as e:
        print(f"❌ Error loading test video: {e}")
        return None


def test_health_endpoints(timeout=5):
    """Test health endpoints for all services"""
    print("Testing health endpoints...")

    for service_name, base_url in SERVICES.items():
        try:
            response = requests.get(f"{base_url}/health", timeout=timeout)
            if response.status_code == 200:
                print(f"✅ {service_name}: Healthy")
                # For backend, also test the root endpoint
                if service_name == "backend":
                    try:
                        root_response = requests.get(f"{base_url}/", timeout=timeout)
                        if root_response.status_code == 200:
                            print(f"   📝 Backend root: {root_response.text}")
                    except:
                        pass
            else:
                print(f"❌ {service_name}: Unhealthy (Status: {response.status_code})")
        except requests.exceptions.RequestException as e:
            print(f"❌ {service_name}: Connection failed - {e}")


def test_transcription_service(timeout=60):
    """Test transcription service with the real test video file"""
    print("\nTesting transcription service...")

    # Load the real test video file
    video_data = load_test_video()
    if video_data is None:
        print("❌ Cannot test transcription service without test video file")
        return

    try:
        files = {"file": ("test-recording.webm", video_data, "video/webm")}
        response = requests.post(
            f"{SERVICES['transcriber']}/transcribe/", files=files, timeout=timeout
        )

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


def test_sentiment_service(timeout=30):
    """Test sentiment analysis service"""
    print("\nTesting sentiment analysis service...")

    test_data = {
        "question": "Tell me about yourself",
        "answer": "I am a software developer with 5 years of experience.",
    }

    try:
        response = requests.post(
            f"{SERVICES['sentiment-analysis']}/sentiment-analysis",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=timeout,
        )

        if response.status_code == 200:
            print("✅ Sentiment analysis service: Working")
            result = response.json()
            print(f"   Input: {result.get('input', 'N/A')}")
        else:
            print(
                f"❌ Sentiment analysis service: Failed (Status: {response.status_code})"
            )
            print(f"   Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Sentiment analysis service: Connection failed - {e}")


def test_audio_analysis_service(timeout=60):
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
            timeout=timeout,
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


def test_backend_agent_endpoints(timeout=120):
    """Test all Azure AI agent endpoints in the backend"""
    print("\nTesting backend Azure AI agent endpoints...")

    # Test data for all endpoints
    test_q_and_a = {
        "question": "Tell me about your experience with team collaboration",
        "answer": "I have extensive experience working in cross-functional teams. In my previous role, I led a team of 5 developers and collaborated with product managers, designers, and stakeholders to deliver high-quality software solutions. I believe in open communication, regular feedback, and creating an inclusive environment where everyone feels valued and heard.",
    }

    # Test 1: Response Content Analysis
    print("   Testing Response Content Analysis...")
    try:
        response = requests.post(
            f"{SERVICES['backend']}/response-content",
            json=test_q_and_a,
            headers={"Content-Type": "application/json"},
            timeout=timeout,  # Longer timeout for AI agents
        )

        if response.status_code == 200:
            print("   ✅ Response Content Analysis: Working")
            print(f"   📝 Response: {response.text}")
        else:
            print(
                f"   ❌ Response Content Analysis: Failed (Status: {response.status_code})"
            )
            print(f"   Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Response Content Analysis: Connection failed - {e}")

    # Test 2: Response Sentiment Analysis
    print("   Testing Response Sentiment Analysis...")
    try:
        response = requests.post(
            f"{SERVICES['backend']}/response-sentiment",
            json=test_q_and_a,
            headers={"Content-Type": "application/json"},
            timeout=timeout,
        )

        if response.status_code == 200:
            print("   ✅ Response Sentiment Analysis: Working")
            print(f"   📝 Response: {response.text}")
        else:
            print(
                f"   ❌ Response Sentiment Analysis: Failed (Status: {response.status_code})"
            )
            print(f"   Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Response Sentiment Analysis: Connection failed - {e}")

    # Test 3: Keyword Analysis
    print("   Testing Keyword Analysis...")
    try:
        response = requests.post(
            f"{SERVICES['backend']}/keyword-analysis",
            json={"questionAndAnswer": test_q_and_a},
            headers={"Content-Type": "application/json"},
            timeout=timeout,
        )

        if response.status_code == 200:
            print("   ✅ Keyword Analysis: Working")
            print(f"   📝 Response: {response.text}")
        else:
            print(f"   ❌ Keyword Analysis: Failed (Status: {response.status_code})")
            print(f"   Error: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Keyword Analysis: Connection failed - {e}")


def test_full_workflow(timeout=120):
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
        trans_response = requests.post(
            f"{SERVICES['transcriber']}/transcribe/", files=files, timeout=timeout
        )

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
            timeout=timeout,
        )

        if audio_response.status_code == 200:
            print("   ✅ Audio analysis successful")
            audio_result = audio_response.json()
            print(f"   📊 Audio scores: {list(audio_result.get('results', {}).keys())}")
            # Show some actual scores
            for feature, data in audio_result.get("results", {}).items():
                print(f"      {feature}: {data.get('Score', 'N/A')}/10")
        else:
            print(f"   ❌ Audio analysis failed: {audio_response.status_code}")
            print(f"   Error: {audio_response.text}")

        # Step 3: Test sentiment analysis with actual transcription
        print("   Step 3: Sentiment analysis...")
        sentiment_data = {
            "question": "Tell me about yourself",
            "answer": edited_transcription,
        }

        sentiment_response = requests.post(
            f"{SERVICES['sentiment-analysis']}/sentiment-analysis",
            json=sentiment_data,
            headers={"Content-Type": "application/json"},
            timeout=timeout,
        )

        if sentiment_response.status_code == 200:
            print("   ✅ Sentiment analysis successful")
            sentiment_result = sentiment_response.json()
            print(
                f"   📊 Sentiment input: {sentiment_result.get('input', 'N/A')[:100]}..."
            )
            # Show sentiment analysis results
            if "analysis" in sentiment_result and sentiment_result["analysis"]:
                for emotion in sentiment_result["analysis"][0]:
                    print(f"      {emotion['label']}: {emotion['score']:.3f}")
        else:
            print(f"   ❌ Sentiment analysis failed: {sentiment_response.status_code}")
            print(f"   Error: {sentiment_response.text}")

        # Step 4: Test Azure AI agents with actual transcription
        print("   Step 4: Azure AI Agent Analysis...")

        # Test response content analysis with actual transcription
        agent_data = {
            "question": "Tell me about yourself",
            "answer": edited_transcription,
        }

        try:
            agent_response = requests.post(
                f"{SERVICES['backend']}/response-content",
                json=agent_data,
                headers={"Content-Type": "application/json"},
                timeout=timeout,
            )

            if agent_response.status_code == 200:
                print("   ✅ Azure AI Response Content Analysis: Working")
                print(f"   📝 Agent Response: {agent_response.text}")
            else:
                print(
                    f"   ❌ Azure AI Response Content Analysis: Failed (Status: {agent_response.status_code})"
                )
                print(f"   Error: {agent_response.text}")
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Azure AI Response Content Analysis: Connection failed - {e}")

        print("   ✅ Complete workflow test finished")

    except requests.exceptions.RequestException as e:
        print(f"   ❌ Workflow test failed: {e}")


def parse_arguments():
    """Parse command line arguments"""
    parser = argparse.ArgumentParser(
        description="Test backend services for P4P application",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python test-services.py                    # Test all services
  python test-services.py --service health  # Test only health endpoints
  python test-services.py --service backend # Test only backend services
  python test-services.py --service audio   # Test only audio analysis
  python test-services.py --service workflow # Test only full workflow
  python test-services.py --list            # List available services
        """,
    )

    parser.add_argument(
        "--service",
        "-s",
        choices=[
            "all",
            "health",
            "transcriber",
            "audio",
            "sentiment",
            "backend",
            "workflow",
            "agents",
        ],
        default="all",
        help="Specific service to test (default: all)",
    )

    parser.add_argument(
        "--list", "-l", action="store_true", help="List available services and exit"
    )

    parser.add_argument(
        "--timeout",
        "-t",
        type=int,
        default=120,
        help="Timeout for requests in seconds (default: 120)",
    )

    parser.add_argument(
        "--no-wait", action="store_true", help="Skip waiting for services to be ready"
    )

    return parser.parse_args()


def list_available_services():
    """List all available services for testing"""
    print("🔍 Available Services for Testing")
    print("=" * 40)
    print("health      - Health endpoints for all services")
    print("transcriber - Transcription service with test video")
    print("audio       - Audio analysis service")
    print("sentiment   - Sentiment analysis service")
    print("backend     - Backend API health and root endpoints")
    print("agents      - Azure AI agent endpoints")
    print("workflow    - Complete end-to-end workflow")
    print("all         - All services (default)")
    print("\nUsage: python test-services.py --service <service_name>")


def main():
    args = parse_arguments()

    if args.list:
        list_available_services()
        return

    print("🔍 Testing Backend Services")
    print("=" * 50)
    print(f"Service: {args.service}")
    print(f"Timeout: {args.timeout}s")
    print("=" * 50)

    # Wait a moment for services to be ready (unless --no-wait is specified)
    if not args.no_wait:
        print("Waiting for services to be ready...")
        time.sleep(2)

    # Test specific service or all services
    if args.service == "all":
        test_health_endpoints(args.timeout)
        test_transcription_service(args.timeout)
        test_sentiment_service(args.timeout)
        test_audio_analysis_service(args.timeout)
        test_backend_agent_endpoints(args.timeout)
        test_full_workflow(args.timeout)
    elif args.service == "health":
        test_health_endpoints(args.timeout)
    elif args.service == "transcriber":
        test_transcription_service(args.timeout)
    elif args.service == "audio":
        test_audio_analysis_service(args.timeout)
    elif args.service == "sentiment":
        test_sentiment_service(args.timeout)
    elif args.service == "backend":
        test_health_endpoints(args.timeout)  # This includes backend health
    elif args.service == "agents":
        test_backend_agent_endpoints(args.timeout)
    elif args.service == "workflow":
        test_full_workflow(args.timeout)
    else:
        print(f"❌ Unknown service: {args.service}")
        print("Use --list to see available services")
        sys.exit(1)

    print("\n" + "=" * 50)
    print("✅ Testing complete!")


if __name__ == "__main__":
    main()
