import React from 'react';
import './HeroCard.css'

function HeroCard({image,name}) {
    return (
      <div className="cardHero">
        <img className="imgCont" src={image}/>
        <h5>{name}</h5>
      </div>
  
    );
}
  
export default HeroCard;