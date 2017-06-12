import React from 'react';
import {shallow} from 'enzyme';
import Select from './Select';

test('renders without crashing', () => {
  shallow(<Select name="textinput" label="Joe Soap" value="value" options={[]} multi={false} allowCreate={true} onChange={() => {}}/>);
});




