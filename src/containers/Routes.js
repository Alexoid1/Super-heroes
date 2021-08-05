import { Route, Switch } from 'react-router-dom';
import HeroesCatalogue from './HeroesCatalogue';
import HeroInfo from '../components/HeroInfo';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HeroesCatalogue} />
    <Route exact path="/hero/:category/:index" component={HeroInfo} />
  </Switch>
);

export default Routes;
