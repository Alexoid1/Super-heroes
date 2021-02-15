import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import store from '../reducers/index';
import HeroInfo from '../components/HeroInfo';

const renderer = new ShallowRenderer();

it('should render HeroInfo correctly', () => {
  renderer.render(
    <Provider store={store}>
      <HeroInfo />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
