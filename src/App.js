import './App.css';
import TaskInput from './components/TaskInput';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{fontSize: "40px", fontWeight: "600"}}>
          Welcome to QuadB tech Assignment.
        </p>
        <TaskInput />
      </header>
    </div>
  );
}

export default App;
