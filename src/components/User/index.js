import React, { Component } from 'react';
import Header from './Header';
import Detail from './Detail';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Detail />
      </div>
    );
  }
}

export default User;
