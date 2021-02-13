import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import heroesReducer from './heroes';
import heroReducer from './hero';

const rootReducer = combineReducers({
  heroes: heroesReducer,
  hero: heroReducer,
});
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
