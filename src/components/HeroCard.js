import React from 'react';
import { Link } from 'react-router-dom';
import './HeroCard.css'

function HeroCard({id, image, name}) {
  const rou=`/hero/${id}`
    return (
      <Link to={rou}>
        <div className="cardHero">
          <img className="imgCont" src={image}/>
          <h5>{name}</h5>
        </div>
      </Link>
      
  
    );
}
  
export default HeroCard;