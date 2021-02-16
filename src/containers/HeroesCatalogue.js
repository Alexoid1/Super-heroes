import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchHeroes,
  nextHeroes,
  lastHeroes,
} from '../actions/index';
import HeroCard from '../components/HeroCard';
import Spinner from '../components/Spinner';
import MenuSelect from '../components/MenuSelect';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import './HeroesCatalogue.css';

function HeroesCatalogue({
  fetchHeroes, heroes, nextHeroes, lastHeroes,
}) {
  const [start, setStart] = useState(heroes.startIndex);
  const [end, setEnd] = useState(heroes.lastIndex);
  useEffect(() => {
    fetchHeroes();
  }, []);
  function firstFive(array) {
    const arr = array.slice(start, end);
    return arr;
  }

  function handleIncrease(e) {
    e.preventDefault();
    setEnd(heroes.lastIndex);
    setStart(heroes.startIndex);
    if (heroes.sHeroes[heroes.lastIndex + 1]) {
      nextHeroes();
    }
  }
  function handleDecrese(e) {
    e.preventDefault();
    setEnd(heroes.lastIndex);
    setStart(heroes.startIndex);
    if (heroes.startIndex - 5 >= 0) {
      lastHeroes();
    }
  }
  let comp;
  if (heroes.loading) {
    comp = <Spinner />;
  } else if (heroes.error) {
    comp = <h2 className="error">{heroes.error}</h2>;
  } else {
    comp = (
      <>
        <SearchBar />
        <CategoryFilter />
        <div className="header-container">
          {
            firstFive(heroes.sHeroes).map(hero => (
              <HeroCard
                key={hero.id}
                id={hero.id}
                image={hero.images.sm}
                name={hero.name}
              />
            ))
          }

        </div>
        <MenuSelect handleNext={handleIncrease} handleLast={handleDecrese} />

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
    startIndex: PropTypes.number.isRequired,
    lastIndex: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }),
  fetchHeroes: PropTypes.func.isRequired,
  nextHeroes: PropTypes.func.isRequired,
  lastHeroes: PropTypes.func.isRequired,
};

HeroesCatalogue.defaultProps = {
  heroes: {},

};
const mapDispatchToProps = dispatch => ({
  fetchHeroes: () => dispatch(fetchHeroes()),
  nextHeroes: () => dispatch(nextHeroes()),
  lastHeroes: () => dispatch(lastHeroes()),
});

const mapStateToProps = state => ({
  heroes: state.heroes,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesCatalogue);
