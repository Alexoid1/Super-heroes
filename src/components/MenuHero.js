import React from 'react';
import { Link } from 'react-router-dom';
import './MenuHero.css'

function MenuHero({preview}) {
    console.log(typeof(preview))
    const a=preview*1+1;
    const b=preview*1-1
    const rounext=`/hero/${a}`
    const roulast=`/hero/${b}`
    return (
      <div className="butonCont2">
        <Link to="/" className="exit">EXIT</Link>
        <Link to={roulast}><i class="fa fa-arrow-left fa-3x" aria-hidden="true"></i></Link>
        <Link to={rounext}><i class="fa fa-arrow-right fa-3x" aria-hidden="true"></i></Link>
      </div>
  
    );
}
  
export default MenuHero;