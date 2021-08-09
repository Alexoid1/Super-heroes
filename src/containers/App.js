import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="animated-background" data-testid="website_name">
        <Navbar/>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
