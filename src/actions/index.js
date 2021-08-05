
import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  CHANGE_TEXT,
  LAST_HEROES,
  NEXT_HEROES,
  FILTER_CHANGE,

} from '../action-types';

const fetchHeroesRequest = () => ({
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

export const changeText = text => ({
  type: CHANGE_TEXT,
  payload: text,
});

export const nextHeroes = (num) => ({
  type: NEXT_HEROES,
  payload: num
});

export const lastHeroes = (num) => ({
  type: LAST_HEROES,
  payload: num
});

export const changeFilter = value => ({
  type: FILTER_CHANGE,
  payload: value
});



