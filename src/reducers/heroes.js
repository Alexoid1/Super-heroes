import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_SUCCESS,
  NEXT_HEROES,
  CHANGE_TEXT,
  FILTER_CHANGE,
} from '../action-types';

const initialState = {
  heroes: [],
  loading: false,
  error: '',
  startIndex: 0,
  text: '',
  filter: 'All',
};

const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEROES_SUCCESS:
      return {
        ...state,
        loading: false,
        heroes: [...action.payload],
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
