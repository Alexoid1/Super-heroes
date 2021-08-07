import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MenuHero.css';


function MenuHero({ preview ,category, categoryLength, heroes}) {
  let a;
  let b;
  if(heroes[preview+1]){
    a = heroes[preview +1].id
  }

  if(heroes[preview-1]){
    b = heroes[preview -1].id;
  }
  
  const rounext = `/hero/${category}/${a}`;
  const roulast = `/hero/${category}/${b}`;
  return (
    <div className="butonCont2">
      <Link to="/" className="exit">EXIT</Link>

      {preview*1-1<0? null : <Link to={roulast}><i className="fa fa-arrow-left fa-3x" aria-hidden="true" /></Link>}
      {preview*1+1>categoryLength-1 ? null : <Link to={rounext}><i className="fa fa-arrow-right fa-3x" aria-hidden="true" /></Link>}
    </div>

  );
}

MenuHero.propTypes = {
  preview: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  heroes: state.heroes.heroes,
});


export default connect(mapStateToProps)(MenuHero);
