import axios from 'axios';
import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  HERO_FAILURE,
  HERO_REQUEST,
  HERO_SUCCESS,
  CHANGE_TEXT,
  SEARCH_HEROES,
  LAST_HEROES,
  NEXT_HEROES,
} from '../action-types';

const fetchHeroesRequest = () => ({
    type: FETCH_HEROES_REQUEST,
});
  
const fetchHeroesSuccess = heroes => ({
    type: FETCH_HEROES_SUCCESS,
    payload: heroes,
});
  
const fetchHeroesFailure = error => ({
    type: FETCH_HEROES_FAILURE,
    payload: error,
});

const heroRequest = () => ({
  type: HERO_REQUEST,
});

const heroSuccess = hero => ({
  type: HERO_SUCCESS,
  payload: hero,
});

 const heroFailure = error => ({
  type: HERO_FAILURE,
  payload: error,
});

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  payload: text
});

export const searchHeroes = () => ({
  type: SEARCH_HEROES,
});


export const nextHeroes = () => ({
  type: NEXT_HEROES,
});

export const lastHeroes = () => ({
  type: LAST_HEROES,
});

export const fetchHeroes = () => dispatch => {
    dispatch(fetchHeroesRequest);
    axios.get(`https://akabab.github.io/superhero-api/api/all.json`)
      .then(response => {
        
        const heroes = response.data;
        console.log(heroes)
  
        dispatch(fetchHeroesSuccess(heroes));
      })
      .catch(error => {
        dispatch(fetchHeroesFailure(error.message));
      });
};

export const fetchHero = (id) => dispatch => {
  dispatch(heroRequest);
  axios.get(`https://akabab.github.io/superhero-api/api/id/${id}.json`)
    .then(response => {
      
      const hero = response.data;
      console.log(hero)

      dispatch(heroSuccess(hero));
    })
    .catch(error => {
      dispatch(heroFailure(error.message));
    });
};

