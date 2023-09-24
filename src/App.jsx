// App.jsx
import React from 'react';
import './App.css';
import ChessClock from './components/ChessClock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Timer</h1>
      </header>
      <ChessClock />
    </div>
  );
}

export default App;