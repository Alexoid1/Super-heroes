import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Navbar from '../components/Navbar';
import Modal from '../modals/Modal';
import './App.css';

function App() {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };
  return (
    <BrowserRouter>
      <div className="animated-background" data-testid="website_name">
        <Modal active={active} toggle={toggle} />
        <Navbar onClick={toggle} />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
