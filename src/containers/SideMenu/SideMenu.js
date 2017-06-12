import React, { Component } from 'react';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      something : ''
    };
  }

  render() {
    return (
      <div className="Shopping-Cart">
        <div className="shopping-cart-heading">
          <h2>Side Menu</h2>
          <h2>TBC</h2>
        </div>
      </div>
    );
  }
}

export default SideMenu;
