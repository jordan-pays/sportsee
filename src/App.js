import './App.css';
import Header from './components/Header';
import LeftNav from './components/LeftNav';
import Router from './routes/Router';

function App() {
  return (
    <>
      <Header />
      <div className='container_app'>
        <LeftNav />
        <Router />
      </div>
    </>
  );
}

export default App;
