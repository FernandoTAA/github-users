import React, { Component } from 'react';
import Search from '../Search';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Header
        <Search />
      </div>
    );
  }
}

export default Header;
