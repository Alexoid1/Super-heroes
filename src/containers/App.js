import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from '../reducers/index';
import HeroesCatalogue from '../containers/HeroesCatalogue';
import HeroInfo from '../components/HeroInfo'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="animated-background">
          <Switch>
            <Route exact path="/" component={HeroesCatalogue} />
            <Route exact path="/hero/:id" component={HeroInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
