import React from 'react';
import MenuLaw from './index';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';
import store from '../../../redux/store';
import {Provider} from 'react-redux';

configure({adapter: new Adapter()}); 

describe('Menu Law Test suite', () => {
    
    it('Actions on click is triggered when click on a menu Item', () => {
        const actionsOnClick = jest.fn();
        const wrapper = mount(
        <Provider store={store}>
            <MenuLaw/>
        </Provider>
        );
        
        wrapper
        .find('.menu-leyes__item')
        .at(0)
        .simulate('click');
        
        expect(actionsOnClick.mock.calls).toEqual([]);
    });

});
