import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  NEXT_HEROES,
  LAST_HEROES,
  CHANGE_TEXT,
  SEARCH_HEROES,
  FILTER_CHANGE
} from '../action-types';

const initialState = {
  heroes: [],
  sHeroes: [],
  loading: false,
  error: '',
  startIndex: 0,
  lastIndex: 5,
  text: '',
  filter: 'All',
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
        heroes: [...action.payload],
        sHeroes: action.payload,
        error: '',
      };
    case FETCH_HEROES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEXT_HEROES:
      return {
        ...state,
        startIndex: state.startIndex + action.payload,
        lastIndex: state.lastIndex + action.payload,
      };
    case LAST_HEROES:
      return {
        ...state,
        startIndex: state.startIndex - action.payload,
        lastIndex: state.lastIndex - action.payload,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
      };
   

    default:
      return state;
  }
};

export default heroesReducer;
