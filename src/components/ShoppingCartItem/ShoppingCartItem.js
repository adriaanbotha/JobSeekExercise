import React, { Component } from 'react';
import './ShoppingCartItem.css';
const NumberFormat = require('react-number-format');

class ShoppingCartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    // this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
  }

  // onChangeUserLogin(user) {
  //   const userName = user.value;
  //   const evt = {
  //     userNameSelected: userName
  //   }
  //   this.setState({ userNameSelected: userName || '' });
  //   this.props.userSelected(evt);
  // }

  render() {
    const FORMAT_AMOUNT = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return (
      <div className="cartItem">
        <div className="line"></div>
        <h4>{this.props.jobTitle}</h4>
        <p>{this.props.jobCategory}</p>
        <p>{this.props.jobProduct}</p>
        <p>{this.props.jobDescription}</p>
        <p>{FORMAT_AMOUNT.format(this.props.jobPrice)}</p>
        <div className="line"></div>
      </div>
    );
  }
}

export default ShoppingCartItem;
