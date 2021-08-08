import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import heroesReducer from './heroes';

const rootReducer = combineReducers({
  heroes: heroesReducer,
});
const initialState = {};
const store = createStore(
  rootReducer, initialState, applyMiddleware(thunk),
);

export default store;
