import { Provider } from 'react-redux';
import store from '../reducers/index';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import MenuSelect from '../components/MenuSelect';

const renderer = new ShallowRenderer();

it('should render MenuSelect correctly', () => {
    renderer.render(<Provider store={store}>
                      <MenuSelect />
                    </Provider>); 
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});