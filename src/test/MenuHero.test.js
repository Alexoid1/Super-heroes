import { Provider } from 'react-redux';
import store from '../reducers/index';
import ShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import MenuHero from '../components/MenuHero';

const renderer = new ShallowRenderer();

it('should render MenuHero correctly', () => {
    renderer.render(<Provider store={store}>
                      <MenuHero />
                    </Provider>); 
    expect(renderer.getRenderOutput()).toMatchSnapshot();
});