import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LeftNav from './components/LeftNav';
import Router from './routes/Router';

function App() {
  return (
    <>
      <Header />
      <view className='container_app'>
        <LeftNav />
        <Router />
      </view>

    </>
  );
}

export default App;
