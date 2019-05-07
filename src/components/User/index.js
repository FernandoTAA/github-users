import React, { Component } from 'react';
import Header from './Header';
import Detail from './Detail';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { userLogin: '' };
    this.headerSearchOnChange = this.headerSearchOnChange.bind(this);
  }

  headerSearchOnChange(userLogin) {
    this.setState({ userLogin });
  }

  render() {
    const { userLogin } = this.state;
    return (
      <div>
        <Header searchOnChange={this.headerSearchOnChange} />
        <Detail userLogin={userLogin} />
      </div>
    );
  }
}

export default User;
