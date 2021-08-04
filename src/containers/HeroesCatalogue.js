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
  const cardsNumber=5
  const [heroess,setHeroes]= useState([]);
  const [heroesC, setHeroesC] = useState([]);
  const [start, setStart] = useState(0);
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
    let arr
    let delimiter=0
    let anex
    if(array.length<cardsNumber)
      arr = array.slice(start, array.length);
    else{
      if(!array[start+cardsNumber]){
        delimiter = start+cardsNumber-array.length
        arr = array.slice(start, array.length);
        anex=array.slice(0,delimiter)
        arr=arr.concat(anex)
        
      }else if(start<0){
        delimiter=start+cardsNumber
        arr=array.slice(start,array.length).concat(array.slice(0,delimiter))

         } else{
        arr = array.slice(start, start+cardsNumber);
      }
      
    }
    return arr;
  }

  function handleIncrease(e) {
    e.preventDefault();
  
    setStart(start+cardsNumber);
    if (heroess[start+5 + 1]) {
      nextHeroes(5);
    }
  }

  function handleDecrese(e) {
    e.preventDefault();
   
    setStart(start-cardsNumber);
    if (heroes.startIndex - cardsNumber >= 0) {
      lastHeroes(5);
    }
  }

  function handleOneDecrese(e) {
    e.preventDefault();
    
    if (start<-cardsNumber+1) {
      setStart(heroesC.length-cardsNumber)
      
    }else{
      setStart(start-1);
    }
  }

  function handleOneIncrese(e) {
    e.preventDefault();
    
    if (start+5>heroesC.length+3) {
      setStart(0)
      
    }else{
      
      setStart(start+1);
    }
  }


  const searchHeroes  = (filte) => {
    const cloneHeroes = heroess
    let her;
    if(filte==='All'){
      her=heroess
    }else{
     her=cloneHeroes.filter((hero)=>{
      return hero.appearance.race===filte
    })}
    setHeroesC(her)
    setStart(0)

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
        <CategoryFilter onChange={searchHeroes}   />
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
        <div>
        {
          heroesC.length>5?
            (<MenuSelect 
              handleNext={handleIncrease} 
              handleLast={handleDecrese} 
              handleOneLast={handleOneDecrese} 
              handleOneNext={handleOneIncrese} 
              />
            ):(
              null
            )
            
          }
        

        </div>
       
        

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
  filte: state.heroes.filter,
  heroes: state.heroes,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesCatalogue);
