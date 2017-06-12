import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingCartItem from './ShoppingCartItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ShoppingCartItem jobTitle="jobTitle"
                                   jobDescription="jobDescription"
                                   jobCategory="jobCategory"
                                   jobProduct="jobProduct"
                                   jobPrice={21.20}/>, div);
});


