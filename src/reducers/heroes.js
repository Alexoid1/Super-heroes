import {
    FETCH_HEROES_FAILURE,
    FETCH_HEROES_REQUEST,
    FETCH_HEROES_SUCCESS,
  } from '../action-types';
  
  const initialState = {
    hero: [],
    heroes: [],
    loading: false,
    error: '',
  };
  
  const heroesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_HEROES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_HEROES_SUCCESS:
        return {
          ...state,
          loading: false,
          books: action.payload,
          error: '',
        };
      case FETCH_HEROES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
        return state;
        }
      };
      
export default heroesReducer;        