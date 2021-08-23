import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import DotLoader from 'react-spinners/ClipLoader';
import { projectFirestore } from '../service/firebase';
import {
  nextHeroes,
  fetchHeroesFailure,
  fetchHeroesSuccess,
} from '../actions/index';
import baseUrl from '../helpers/base-url';
import HeroCard from '../components/HeroCard';
import MenuSelect from '../components/MenuSelect';
import MenuSelectMobile from '../components/MenuSelectMobile';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import './HeroesCatalogue.css';

function HeroesCatalogue({
  fetchHeroesFailure, heroes, filte, fetchHeroesSuccess,
}) {
  const cardsNumber = 5;
  const [heroess, setHeroes] = useState([]);
  const [heroesC, setHeroesC] = useState([]);
  const [start, setStart] = useState(0);
  const [dealCards, setDealCards] = useState('dealCards');
  const isDesktop = useMediaQuery({ query: '(min-width: 470px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 470px)' });

  useEffect(() => {
    if (heroes.heroes.length > 0) {
      setHeroes(heroes.heroes);
      fetchHeroesSuccess(heroes.heroes);
      setHeroesC(heroes.heroes);
    } else {
      fetch(`${baseUrl}`, { mode: 'cors' })
        .then((res) => {
          if (res.ok) {
            res.json().then((jsonRes) => {
              let apiheroes = [];

              const unsub = projectFirestore.collection('images')
                .onSnapshot((snap) => {
                  const documents = [];
                  snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id });
                  });

                  apiheroes = jsonRes.concat(documents);
                  // case sort by name
                  /* .sort((a,b)=>{
                  var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                  if (nameA < nameB) //sort string ascending
                    return -1;
                  if (nameA > nameB)
                    return 1;
                  return 0;
                        }); */

                  setHeroes(apiheroes);
                  fetchHeroesSuccess(apiheroes);
                  setHeroesC(apiheroes);
                });
              return () => unsub();
            });
          } else {
            fetchHeroesFailure('and error while fetch favourites');
          }
        }).catch((error) => {
          fetchHeroesFailure(error);
        });
    }
  }, []);

  function firstFive(array) {
    let arr;
    let delimiter = 0;
    let anex;
    if (array.length < cardsNumber) arr = array.slice(start, array.length);
    else if (!array[start + cardsNumber]) {
      delimiter = start + cardsNumber - array.length;
      arr = array.slice(start, array.length);
      anex = array.slice(0, delimiter);
      arr = arr.concat(anex);
    } else if (start < 0) {
      delimiter = start + cardsNumber;
      arr = array.slice(start, array.length).concat(array.slice(0, delimiter));
    } else {
      arr = array.slice(start, start + cardsNumber);
    }
    return arr;
  }

  function oneByOne(array) {
    const cardOne = array.slice(start, start + 1);
    return cardOne;
  }

  function handleIncrease(e) {
    e.preventDefault();

    setDealCards('takeCards');
    setTimeout(() => {
      if (start + cardsNumber > heroesC.length - 1) {
        setStart(0);
      } else {
        setStart(start + cardsNumber);
      }
    }, 1000);
    nextHeroes(start);
    setTimeout(() => {
      setDealCards('dealCards');
    }, 1500);
  }

  function handleDecrese(e) {
    e.preventDefault();
    setDealCards('takeCards');
    setTimeout(() => {
      if (start < 0) {
        setStart(heroesC.length - 5);
      } else {
        setStart(start - cardsNumber);
      }
    }, 1000);
    nextHeroes(start);
    setTimeout(() => {
      setDealCards('dealCards');
    }, 1500);
  }
  function handleOneDecreseMobile(e) {
    e.preventDefault();

    if (start <= 0) {
      setStart(heroesC.length - 1);
    } else {
      setStart(start - 1);
    }
    nextHeroes(start);
  }

  function handleOneIncreseMobile(e) {
    e.preventDefault();

    if (start >= heroesC.length - 1) {
      setStart(0);
    } else {
      setStart(start + 1);
    }
    nextHeroes(start);
  }

  function handleOneDecrese(e) {
    e.preventDefault();

    if (start < -cardsNumber + 1) {
      setStart(heroesC.length - cardsNumber + 1);
    } else {
      setStart(start - 1);
    }
    nextHeroes(start);
  }

  function handleOneIncrese(e) {
    e.preventDefault();

    if (start + 5 > heroesC.length + 3) {
      setStart(0);
    } else {
      setStart(start + 1);
    }
    nextHeroes(start);
  }

  const searchHeroes = (filte) => {
    const cloneHeroes = heroess;
    let her;
    if (filte === 'All') {
      her = heroess;
    } else {
      her = cloneHeroes.filter((hero) => hero.appearance.race === filte);
    }
    setHeroesC(her);
    fetchHeroesSuccess(her);
    setStart(0);
  };

  let transition = 0;

  const searchByText = (text) => {
    setStart(0);
    const regex = new RegExp(text, 'gi');
    const cloneH = heroess;
    const filterBy = cloneH.filter((hero) => hero.name.match(regex));
    setHeroesC(filterBy);
  };

  let comp;
  if (heroes.loading) {
    comp = setInterval(() => { <DotLoader />; }, 1000);
  } else if (heroes.error) {
    comp = <h2 className="error">{heroes.error}</h2>;
  } else {
    comp = (
      <>
        <div className="allContainer">
          <SearchBar onChange={searchByText} />
          <CategoryFilter onChange={searchHeroes} />

          <div className="header-container">
            {isDesktop

              && firstFive(heroesC).map((hero) => {
                transition += 1;
                return (
                  <div key={hero.id} className={`${dealCards} deal card${transition}`}>
                    <HeroCard
                      id={hero.id.toString()}
                      image={hero.images.sm}
                      name={hero.name}
                      category={filte}
                    />
                  </div>
                );
              })}
            {isMobile
              && oneByOne(heroesC).map((hero) => (
                <HeroCard
                  key={`${hero.id}mobile`}
                  id={hero.id}
                  image={hero.images.sm}
                  name={hero.name}
                  category={filte}
                />
              ))}

          </div>
          <div>
            {isDesktop
            && heroesC.length > 5
              ? (
                <MenuSelect
                  handleNext={handleIncrease}
                  handleLast={handleDecrese}
                  handleOneLast={handleOneDecrese}
                  handleOneNext={handleOneIncrese}
                />
              ) : (
                null
              )}
            {
              isMobile
              && (
              <MenuSelectMobile
                handleOneLast={handleOneDecreseMobile}
                handleOneNext={handleOneIncreseMobile}
              />
              )
            }
          </div>
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
    authorize: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }),

  nextHeroes: PropTypes.func.isRequired,
  fetchHeroesFailure: PropTypes.func.isRequired,
  fetchHeroesSuccess: PropTypes.func.isRequired,
};

HeroesCatalogue.defaultProps = {
  heroes: {},
};
const mapDispatchToProps = (dispatch) => ({
  fetchHeroesFailure: () => dispatch(fetchHeroesFailure()),
  nextHeroes: () => dispatch(nextHeroes()),
  fetchHeroesSuccess: (heroes) => dispatch(fetchHeroesSuccess(heroes)),
});

const mapStateToProps = (state) => ({
  filte: state.heroes.filter,
  heroes: state.heroes,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesCatalogue);
