import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import heroesReducer from './heroes';
// import filterReducer from './filter';


const rootReducer = combineReducers({
  heroes: heroesReducer,
//   filter: filterReducer,
  
});
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);

export default store;