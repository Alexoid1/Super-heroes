import React from 'react';
import './Navbar.css';

function Navbar({onClick}) {
  return (
    <nav className="navb">
      <button className="buttonCreate" type="button" onClick={onClick}>Create Hero</button>
    </nav>

  );
}

export default Navbar;