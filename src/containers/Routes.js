import { Route, Switch } from 'react-router-dom';
import HeroesCatalogue from './HeroesCatalogue';
import HeroInfo from '../components/HeroInfo';

const Routes = () => (
  <Switch>
    <Route exact path="/Super-heroes/" component={HeroesCatalogue} />
    <Route exact path="/Super-heroes/hero/:category/:id" component={HeroInfo} />
  </Switch>
);

export default Routes;
