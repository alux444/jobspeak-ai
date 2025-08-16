import { Mic, Video, Text } from "lucide-react";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden content-container">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Nav />
      </div>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col justify-center items-center text-center flex-1 px-6 animate-fadeIn-delay opacity-0">
        <div className="max-w-5xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Interview Response Analyser
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl md:text-2xl mb-12">
            Personalised AI-powered feedback on your behavioral interview responses
          </p>
          <a
            href="/interview-analyser"
            className="bg-indigo-500 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition cursor-pointer"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Info / Features Section */}
      <main className="px-6 pb-42 animate-fade-in animation-delay-500">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          How It Works & Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4">
              <Mic className="text-blue-600 dark:text-blue-300 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Audio Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Understand tone, pace, and clarity of your spoken responses with AI-driven insights.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full mb-4">
              <Video className="text-green-600 dark:text-green-300 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Video Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              AI evaluates your facial expressions and body language to give actionable feedback.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-full mb-4">
              <Text className="text-yellow-600 dark:text-yellow-300 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Text Transcription</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive clear text summaries and analysis of your responses for reflection and improvement.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
