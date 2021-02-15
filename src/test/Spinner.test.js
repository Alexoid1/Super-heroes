import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import store from '../reducers/index';
import Spinner from '../components/Spinner';

const renderer = new ShallowRenderer();

it('should render Spinner correctly', () => {
  renderer.render(
    <Provider store={store}>
      <Spinner />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
