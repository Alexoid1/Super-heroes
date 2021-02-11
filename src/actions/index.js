import axios from 'axios';
import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  SEARCH_HEROES_FAILURE,
  CHANGE_TEXT,
  SEARCH_HEROES,
  LAST_HEROES,
  NEXT_HEROES,
} from '../action-types';

export const fetchHeroesRequest = () => ({
    type: FETCH_HEROES_REQUEST,
});
  
export const fetchHeroesSuccess = heroes => ({
    type: FETCH_HEROES_SUCCESS,
    payload: heroes,
});
  
export const fetchHeroesFailure = error => ({
    type: FETCH_HEROES_FAILURE,
    payload: error,
});

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  payload: text
});

export const searchHeroes = () => ({
  type: SEARCH_HEROES,
});

export const searchHeroesFailure = error => ({
  type: SEARCH_HEROES_FAILURE,
  payload: error,
});

export const nextHeroes = () => ({
  type: NEXT_HEROES,
});

export const lastHeroes = () => ({
  type: LAST_HEROES,
});



export const fetchHeroes = () => dispatch => {
    dispatch(fetchHeroesRequest);
    var config={headers:{'Access-Control-Allow-Origin':'*'}}
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

