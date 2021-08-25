import { Route, Switch, Redirect } from 'react-router-dom';
import HeroesCatalogue from './HeroesCatalogue';
import HeroInfo from '../components/HeroInfo';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HeroesCatalogue} />
    <Route exact path="/hero/:category/:id" component={HeroInfo} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
