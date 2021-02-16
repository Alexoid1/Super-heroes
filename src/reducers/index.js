import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import heroesReducer from './heroes';
import filterReducer from './filter';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  filter: filterReducer,
});
const initialState = {};
const store = createStore(
  rootReducer, initialState, applyMiddleware(thunk),
);

export default store;
