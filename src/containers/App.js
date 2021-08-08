import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroesCatalogue from './HeroesCatalogue';
import { Provider } from 'react-redux';
import store from '../reducers/index';
import HeroInfo from '../components/HeroInfo';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="animated-background" data-testid="website_name">
          <Switch>
            <Route exact path="/" component={HeroesCatalogue} />
            <Route exact path="/hero/:category/:id" component={HeroInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
