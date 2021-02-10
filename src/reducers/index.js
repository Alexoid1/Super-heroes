import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import heroesReducer from './heroes';
// import filterReducer from './filter';
// import searchReducer from './search';

const rootReducer = combineReducers({
  heroes: heroesReducer,
//   filter: filterReducer,
//   search: searchReducer,
});
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);

export default store;