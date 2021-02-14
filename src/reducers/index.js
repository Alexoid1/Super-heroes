import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import heroesReducer from './heroes';
import heroReducer from './hero';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  hero: heroReducer,
});
const initialState = {};
const store = createStore(
  rootReducer, initialState, applyMiddleware(thunk),
);

export default store;
