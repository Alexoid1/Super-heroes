import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import store from '../reducers/index';
import HeroCard from '../components/HeroCard';

const renderer = new ShallowRenderer();

it('should render HeroCard correctly', () => {
  renderer.render(
    <Provider store={store}>
      <HeroCard />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
