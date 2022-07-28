import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Items from './components/itemCode'
import SavedData from './components/saveCart'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/qrCode" element={<SavedData />} />


        </Routes>

      </BrowserRouter>




    </>
  );
}

export default App;
