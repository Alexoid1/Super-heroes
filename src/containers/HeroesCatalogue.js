import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
 
  nextHeroes,
  lastHeroes,
  fetchHeroesFailure,
  fetchHeroesSuccess
} from '../actions/index';
import baseUrl from '../helpers/base-url';
import HeroCard from '../components/HeroCard';
import Spinner from '../components/Spinner';
import MenuSelect from '../components/MenuSelect';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import './HeroesCatalogue.css';

function HeroesCatalogue({
  fetchHeroesFailure, heroes, filte,fetchHeroesSuccess
}) {
  const [heroess,setHeroes]= useState([]);
  const [heroesC, setHeroesC] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  useEffect(() => {
    fetch(`${baseUrl}`, { mode: 'cors' })
    .then(res => {
      if (res.ok) {
        res.json().then(jsonRes => {
          setHeroes(jsonRes);
          fetchHeroesSuccess(jsonRes)
          setHeroesC(jsonRes)
                  });
      } else {
        fetchHeroesFailure('and error while fetch favourites');
      }
    }).catch(error => {
      fetchHeroesFailure(error);
    });
  }, []);
  function firstFive(array) {
    const arr = array.slice(start, end);
    return arr;
  }

  function handleIncrease(e) {
    e.preventDefault();
    setEnd(end+5);
    setStart(start+5);
    if (heroess[end + 1]) {
      nextHeroes(5);
    }
  }

  function handleDecrese(e) {
    e.preventDefault();
    setEnd(end-5);
    setStart(start-5);
    if (heroes.startIndex - 5 >= 0) {
      lastHeroes(5);
    }
  }

  function handleOneDecrese(e) {
    e.preventDefault();
    setEnd(end-1);
    setStart(start-1);
    if (heroes.startIndex - 5 >= 0) {
      lastHeroes(1);
    }
  }

  function handleOneIncrese(e) {
    e.preventDefault();
    setEnd(end+1);
    setStart(start+1);
    if (heroess[end + 1]) {
      nextHeroes(1);
    }
  }


  const searchHeroes  = (filte) => {
    const cloneHeroes = heroess
    const her=cloneHeroes.filter((hero)=>{
      return hero.appearance.race===filte})
      setHeroesC(her)
  }
  let comp;
  if (heroes.loading) {
    comp = setInterval(()=>{<Spinner />},1000);
  } else if (heroes.error) {
    comp = <h2 className="error">{heroes.error}</h2>;
  } else {
    comp = (
      <>
        <SearchBar />
        <CategoryFilter onChange={searchHeroes}  />
        <div className="header-container">
          {
            firstFive(heroesC).map(hero => (
              <HeroCard
                key={hero.id}
                id={hero.id}
                image={hero.images.sm}
                name={hero.name}
              />
            ))
          }

        </div>
        <MenuSelect 
        handleNext={handleIncrease} 
        handleLast={handleDecrese} 
        handleOneLast={handleOneDecrese} 
        handleOneNext={handleOneIncrese} 
        />

      </>

    );
  }

  return comp;
}

HeroesCatalogue.propTypes = {
  heroes: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    heroes: PropTypes.arrayOf(PropTypes.object),
    sHeroes: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string.isRequired,
    
    text: PropTypes.string.isRequired,
  }),
  
  nextHeroes: PropTypes.func.isRequired,
  lastHeroes: PropTypes.func.isRequired,
};

HeroesCatalogue.defaultProps = {
  heroes: {},

};
const mapDispatchToProps = dispatch => ({
  fetchHeroesFailure: () => dispatch(fetchHeroesFailure()),
  nextHeroes: () => dispatch(nextHeroes()),
  lastHeroes: () => dispatch(lastHeroes()),
  fetchHeroesSuccess: () => dispatch(fetchHeroesSuccess()),
});

const mapStateToProps = state => ({
  filte: state.heroes.filte,
  heroes: state.heroes,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesCatalogue);
