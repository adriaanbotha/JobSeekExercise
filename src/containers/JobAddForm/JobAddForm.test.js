import React from 'react';
import ReactDOM from 'react-dom';
import JobAddForm from './JobAddForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JobAddForm addToCart={() => {}}/>, div);
});


