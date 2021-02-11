import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import { fetchHeroes, nextHeroes, lastHeroes } from '../actions/index';
import PropTypes from 'prop-types';
import HeroCard from '../components/HeroCard'
import Spinner from '../components/Spinner'
import MenuSelect from '../components/MenuSelect'
import SearchBar from '../components/SearchBar'
import './HeroesCatalogue.css'


function HeroesCatalogue({fetchHeroes,heroes, nextHeroes, lastHeroes}) {
  const [start,setStart] = useState(heroes.startIndex)
  const[end,setEnd] = useState(heroes.lastIndex)
  const [arry, setArry] = useState([])
  useEffect(() => {
    fetchHeroes();
  }, []);
  function firstFive(array){
    const arr=array.slice(start,end)
    console.log(arr)
    return arr

  }

  function handleIncrease(e){
    e.preventDefault();
    console.log(start,end,heroes.startIndex,heroes.lastIndex)
    setEnd(heroes.lastIndex)
    setStart(heroes.startIndex)
    nextHeroes()
  }

  function handleDecrese(e){
    e.preventDefault();
    console.log(start,end,heroes.startIndex,heroes.lastIndex)
    setEnd(heroes.lastIndex)
    setStart(heroes.startIndex)
    lastHeroes()
  }
  
  // eslint-disable-next-line no-nested-ternary
  return (heroes.loading ? (
    <>
      <Spinner/>
    </>
  ) : heroes.error ? (
    <h2 className="error">{heroes.error}</h2>
  ) : (
    <>
      <SearchBar/>
      <div className="header-container">
        {
            
            firstFive(heroes.sHeroes).map(hero => (
              <HeroCard
                key={hero.id}
                image={hero.images.sm}
                name={hero.name}
              />
            ))
          }
          
      </div>
      <MenuSelect handleNext={handleIncrease} handleLast={handleDecrese}/>
    
    </>
  ));


}


HeroesCatalogue.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.string),
  fetchHeroes: PropTypes.func.isRequired,
 
};

HeroesCatalogue.defaultProps = {
  heroes: {},
};
const mapDispatchToProps = dispatch => ({ 
  fetchHeroes: () => dispatch(fetchHeroes()),
  nextHeroes: ()=> dispatch(nextHeroes()),
  lastHeroes: ()=> dispatch(lastHeroes())
});

const mapStateToProps = state => ({
  heroes: state.heroes,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesCatalogue);