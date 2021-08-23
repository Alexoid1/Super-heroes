import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar({ onClick }) {
  return (
    <nav className="navb">
      <button className="buttonCreate" type="button" onClick={onClick}>
        <a className="anchorC" href="#">Create a Hero</a>
      </button>
    </nav>

  );
}

Navbar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Navbar;
