import './index.css';
import Header from './components/Header';
import CardGame from './components/CardGame';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App wrapper">
      <Header />
      <main>
        <CardGame />
        <Instructions />
      </main>
      <Footer />
    </div>
  );
}

export default App;
