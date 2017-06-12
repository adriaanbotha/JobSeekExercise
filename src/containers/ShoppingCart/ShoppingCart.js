import React, { Component } from 'react';
import './ShoppingCart.scss';
import ShoppingCartItem from '../../components/ShoppingCartItem/ShoppingCartItem';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      something : ''
    };
  }

  render() {
    const FORMAT_AMOUNT = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return (
      <div className="Shopping-Cart">
        <div className="shopping-cart-heading">
          <h2>Shopping Cart</h2>
        </div>
        {this.props.cartItems.map((item, index) =>
          <ShoppingCartItem key={index}
                            jobTitle={item.jobTitle}
                            jobDescription={item.jobDescription}
                            jobCategory={item.jobCategory}
                            jobProduct={item.jobProduct}
                            jobPrice={item.jobPrice}/>
        )}
        <div className="shopping-cart-subtotal">
          <h4>LESS - Specials</h4>
          <h4>({FORMAT_AMOUNT.format(this.props.totalDiscount)})</h4>
        </div>
        <div className="shopping-cart-subtotal">
          <h4>Grand Total</h4>
          <h4>{FORMAT_AMOUNT.format(this.props.total)}</h4>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
