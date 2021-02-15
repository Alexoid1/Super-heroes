import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import store from '../reducers/index';
import SearchBar from '../components/SearchBar';

const renderer = new ShallowRenderer();

it('should render SearchBar correctly', () => {
  renderer.render(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('find component by placeholder', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );
  expect(getByPlaceholderText('Hero Name')).toBeInTheDocument();
});
