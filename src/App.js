import './index.css';
import Header from './components/Header';
import CardGame from './components/CardGame';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

// Thanks to Chase Roberts for the Deck of Cards API :) https://deckofcardsapi.com/

function App() {
  return (
    <div className="App wrapper">
      <Header />
      <CardGame />
      <Instructions />
      <Footer />
    </div>
  );
}

export default App;
