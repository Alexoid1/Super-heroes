import {
  FETCH_HEROES_FAILURE,
  FETCH_HEROES_REQUEST,
  FETCH_HEROES_SUCCESS,
  NEXT_HEROES,
  LAST_HEROES,
  CHANGE_TEXT,
  SEARCH_HEROES,
  FILTER_CHANGE,
  SEARCH_BY_FILTER,
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
        heroes: action.payload,
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
        startIndex: state.startIndex + 5,
        lastIndex: state.lastIndex + 5,
      };
    case LAST_HEROES:
      return {
        ...state,
        startIndex: state.startIndex - 5,
        lastIndex: state.lastIndex - 5,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case SEARCH_HEROES:
      return {
        ...state,
        startIndex: 0,
        lastIndex: 5,
        sHeroes: state.heroes.filter(hero => {
          const regex = new RegExp(state.text, 'gi');
          return hero.name.match(regex);
        }),
        text: '',

      };
    case FILTER_CHANGE:
      return {
        ...state,
        filter: action.payload,
      };
    case SEARCH_BY_FILTER:
      return {
        ...state,
        startIndex: 0,
        lastIndex: 5,
        sHeroes: state.heroes.filter(hero => {
          if (state.filter === 'All') {
            return state.heroes;
          }
          return hero.appearance.race === state.filter;
        }),
        text: '',
      };

    default:
      return state;
  }
};

export default heroesReducer;
