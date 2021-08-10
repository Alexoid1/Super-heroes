import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({onClick}) {
  return (
    <nav className="navb">
      <button className="buttonCreate" type="button" onClick={onClick}>
        <Link className="anchorC" to="#">Create a Hero</Link>  
      </button>
    </nav>

  );
}

export default Navbar;