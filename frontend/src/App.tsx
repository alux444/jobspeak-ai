import "./App.css";
import Footer from "./components/Footer";
import Recorder from "./components/Recorder";

export default function App() {
  return (
    <div className="s">
      <header className="app-header fade-in">
        <h1>Interview Response Analyser</h1>
        <p>
          Practice with random behavioral questions and get
          <span className="highlight"> AI-powered feedback </span>
          on your responses.
        </p>
      </header>

      <main className="fade-in delay">
        <Recorder />
        <Footer />
      </main>
    </div>
  );
}
