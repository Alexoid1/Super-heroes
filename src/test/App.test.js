import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import App from '../containers/App';
import store from '../reducers/index';

const renderer = new ShallowRenderer();

test('renders website name', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByTestId('website_name')).toBeInTheDocument();
});

it('should render App correctly', () => {
  renderer.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
