import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft, FaArrowRight,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MenuHero.css';

function MenuHero({
  preview, category, categoryLength, heroes,
}) {
  let a;
  let b;
  if (heroes[preview + 1]) {
    a = heroes[preview + 1].id;
  }

  if (heroes[preview - 1]) {
    b = heroes[preview - 1].id;
  }

  const rounext = `/hero/${category}/${a}`;
  const roulast = `/hero/${category}/${b}`;
  return (
    <div className="butonCont2">
      <Link to="/" className="exit">EXIT</Link>

      {preview * 1 - 1 < 0 ? null : <Link to={roulast}><FaArrowLeft className="iconSize" /></Link>}
      {preview * 1 + 1 > categoryLength - 1 ? null : <Link to={rounext}><FaArrowRight className="iconSize" /></Link>}
    </div>

  );
}

MenuHero.propTypes = {
  preview: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  categoryLength: PropTypes.number.isRequired,
  heroes: PropTypes.arrayOf(PropTypes.object),
};

MenuHero.defaultProps = {
  heroes: [],
};

const mapStateToProps = (state) => ({
  heroes: state.heroes.filterHeroes,
});

export default connect(mapStateToProps)(MenuHero);
