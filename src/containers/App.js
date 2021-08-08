import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroesCatalogue from './HeroesCatalogue';
import HeroInfo from '../components/HeroInfo';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="animated-background" data-testid="website_name">
        <Switch>
          <Route exact path="/" component={HeroesCatalogue} />
          <Route exact path="/hero/:category/:id" component={HeroInfo} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
