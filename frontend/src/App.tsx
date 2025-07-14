import "./App.css";
import Recorder from "./components/Recorder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interview Response Analyzer</h1>
        <p>Practice with random behavioral questions and get AI-powered feedback on your responses</p>
      </header>
      <main>
        <Recorder />
      </main>
    </div>
  );
}

export default App;
