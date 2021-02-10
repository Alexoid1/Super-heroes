import React from 'react';
import HeroCard from '../components/HeroCard'
import './HeroesCatalogue.css'


function HeroesCatalogue() {
  return (
    <div>
      <div className="header-container">
        <HeroCard/>
        <HeroCard/>
        <HeroCard/>
        <HeroCard/>
        <HeroCard/>
      </div>
    </div>
    
  );
}

export default HeroesCatalogue;