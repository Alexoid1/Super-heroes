import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './MenuHero.css';

function MenuHero({ preview }) {
  const a = preview * 1 + 1;
  const b = preview * 1 - 1;
  const rounext = `/hero/${a}`;
  const roulast = `/hero/${b}`;
  return (
    <div className="butonCont2">
      <Link to="/" className="exit">EXIT</Link>
      <Link to={roulast}><i className="fa fa-arrow-left fa-3x" aria-hidden="true" /></Link>
      <Link to={rounext}><i className="fa fa-arrow-right fa-3x" aria-hidden="true" /></Link>
    </div>

  );
}

MenuHero.propTypes = {
  preview: PropTypes.string.isRequired,
};

export default MenuHero;
