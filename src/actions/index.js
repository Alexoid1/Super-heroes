import axios from 'axios';
import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  CHANGE_TEXT,
  SEARCH_HEROES,
  LAST_HEROES,
  NEXT_HEROES,
  FILTER_CHANGE,
  SEARCH_BY_FILTER,
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

export const changeText = text => ({
  type: CHANGE_TEXT,
  payload: text,
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

export const changeFilter = value => ({
  type: FILTER_CHANGE,
  payload: value,
});

export const searchByFilter = () => ({
  type: SEARCH_BY_FILTER,
});

export const fetchHeroes = () => dispatch => {
  dispatch(fetchHeroesRequest);
  axios.get('https://akabab.github.io/superhero-api/api/all.json')
    .then(response => {
      const heroes = response.data;
      dispatch(fetchHeroesSuccess(heroes));
    })
    .catch(error => {
      dispatch(fetchHeroesFailure(error.message));
    });
};
