import React from 'react';
import {shallow} from 'enzyme';
import TextInput from './TextInput';

test('renders without crashing', () => {
  shallow(<TextInput name="textinput" label="Joe Soap" value="value" placehodler="placehodler text" onChange={() => {
  }}/>);
});



