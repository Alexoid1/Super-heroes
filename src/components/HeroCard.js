import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './HeroCard.css';

function HeroCard({ id, image, name }) {
  const rou = `/hero/${id}`;
  return (
    <Link to={rou}>
      <div className="cardHero">
        <img className="imgCont" src={image} alt="heroimage" />
        <h5>{name}</h5>
      </div>
    </Link>

  );
}

HeroCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default HeroCard;
