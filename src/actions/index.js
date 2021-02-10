import axios from 'axios';
import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
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
  