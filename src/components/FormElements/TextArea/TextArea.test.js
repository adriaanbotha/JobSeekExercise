import React from 'react';
import {shallow} from 'enzyme';
import TextArea from './TextArea';

test('renders without crashing', () => {
  shallow(<TextArea name="text" label="Joe Soap" onChange={() => {
  }} value="Value" rows={1} resize={true} placeholder="placeholder" error=""/>);
});



