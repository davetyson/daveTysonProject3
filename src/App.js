import './App.css';
import { useState } from 'react';
import CardGame from './components/CardGame';

function App() {
  return (
    <div className="App">
      <h1>High Card / Low Card</h1>
      <CardGame />
    </div>
  );
}

export default App;
