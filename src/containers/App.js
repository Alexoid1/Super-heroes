import React,{useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Modal from '../modals/Modal'
import './App.css';

function App() {
  const [ active,setActive ] = useState(false);
  const toggle = () =>{
    setActive(!active)
  }
  return (
    <BrowserRouter>
      <div className="animated-background" data-testid="website_name">
        <Modal active={active} toggle={toggle}>
          <h1>hellloo</h1>
        </Modal>
        <nav className="navb">
          <button className="buttonCreate" type="button" onClick={toggle}>Create Hero</button>
        </nav>
        <Routes />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
