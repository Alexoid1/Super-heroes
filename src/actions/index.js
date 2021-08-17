import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_SUCCESS,
  CHANGE_TEXT,
  NEXT_HEROES,
  FILTER_CHANGE,
  CHANGE_AUTH

} from '../action-types';

export const fetchHeroesSuccess = (heroes) => ({
  type: FETCH_HEROES_SUCCESS,
  payload: heroes,
});

export const fetchHeroesFailure = (error) => ({
  type: FETCH_HEROES_FAILURE,
  payload: error,
});

export const changeText = (text) => ({
  type: CHANGE_TEXT,
  payload: text,
});

export const nextHeroes = (num) => ({
  type: NEXT_HEROES,
  payload: num,
});

export const changeFilter = (value) => ({
  type: FILTER_CHANGE,
  payload: value,
});

export const changeAuth = () => ({
  type: CHANGE_AUTH,
});

