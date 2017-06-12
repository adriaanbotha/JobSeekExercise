import React, { Component } from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './AppHeader.css';
import logo from '../../assets/images/seek-logo-positive.svg';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNameSelected : ''
    };

    this.onChangeUserLogin = this.onChangeUserLogin.bind(this);
  }

  onChangeUserLogin(user) {
    const userName = user.value;
    const evt = {
        userNameSelected: userName
    }
    this.setState({ userNameSelected: userName || '' });
    this.props.userSelected(evt);
  }

  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Login-header">
          <label className="login-label" htmlFor="users">Logged In As</label>
          <ReactSelect className="select-label"
            name="users"
            multi={false}
            allowCreate={false}
            value={this.state.userNameSelected}
            options={this.props.users}
            onChange={this.onChangeUserLogin}/>
        </div>
      </div>
    );
  }
}

export default AppHeader;
