import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="animated-background" data-testid="website_name">
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
