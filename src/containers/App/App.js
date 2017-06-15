import React, { Component } from 'react';
import './App.css';
import AppHeader from "../../components/AppHeader/AppHeader";
import JobAddForm from "../JobAddForm/JobAddForm";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SideMenu from "../SideMenu/SideMenu";
import ShoppingCartService from '../../services/ShoppingCart/ShoppingCartService';

const PRICING_RULES = require('../../data/priceRules');
const shoppingCartService = null;

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      userSelected: {},
      cartItems: [],
      totalDiscount: 0,
      total : 0
    };
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onClearCart = this.onClearCart.bind(this);
    this.processCart = this.processCart.bind(this);

    this.shoppingCartService = new ShoppingCartService(PRICING_RULES);
  }

  onChangeUser(newUser) {
    const userFound = PRICING_RULES.TEST_USERS.find((user) => {
      return user.userName === newUser.userNameSelected;
    });
    this.setState({ userSelected : userFound });
    setTimeout(() => {
      this.shoppingCartService.setUser(this.state.userSelected);
    }, 10);
    this.setState({ cartItems: []});
  }

  onAddToCart(cartItem) {
    this.setState({ cartItems: [...this.state.cartItems, cartItem] });
    this.processCart();
  }

  onClearCart() {
    this.setState({ totalDiscount: 0});
    this.setState({ total: 0});
    this.setState({ cartItems: []});
  }

  processCart() {
    setTimeout(() => {
      this.shoppingCartService.processCart(this.state.cartItems).then(result => {
        const discTotal = result.discTotal;
        const total = result.total;
        const cartItems = result.cartItems;

        this.setState({ totalDiscount: discTotal});
        this.setState({ total: total});
        this.setState({ cartItems: cartItems});
      });
    }, 10);
  }

  render() {
    const users = PRICING_RULES.TEST_USERS.map((user) => {
      return { value: user.userName, label:user.userName };
    });
    return (
      <div className="App">
        <AppHeader users={users} userSelected={this.onChangeUser}/>
        <div className="App-body">
          <div className="App-content">
            <JobAddForm addToCart={this.onAddToCart} clearCart={this.onClearCart}/>
          </div>
          <div className="App-nav">
            <SideMenu/>
          </div>
          <div className="App-cart-side">
            <ShoppingCart cartItems={this.state.cartItems}
                          totalDiscount={this.state.totalDiscount}
                          total={this.state.total}/>
          </div>
        </div>
      </div>
      );
  }
}
export default App;


