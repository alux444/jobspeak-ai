import "./App.css";
import Recorder from "./components/Recorder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interview Response Analyzer</h1>
        <p>Record your response to a behavioral question and get AI feedback</p>
      </header>
      <main>
        <Recorder />
      </main>
    </div>
  );
}

export default App;
