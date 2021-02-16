import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import store from '../reducers/index';
import ProgressBar from '../components/ProgressBar';

const renderer = new ShallowRenderer();

it('should render ProgressBar correctly', () => {
  renderer.render(
    <Provider store={store}>
      <ProgressBar />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
