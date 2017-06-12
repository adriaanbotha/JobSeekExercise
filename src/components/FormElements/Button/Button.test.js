import React from 'react';
import {shallow} from 'enzyme';
import Button from './Button';

test('renders without crashing', () => {
  shallow(<Button name="textinput" label="label" value="Joe Soap" onClick={() => {}}/>);
});





