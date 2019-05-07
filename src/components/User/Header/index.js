import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from '../Search';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { userLogin: '' };
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  searchOnChange(userLogin) {
    this.setState({ userLogin }, () => this.props.searchOnChange(this.state.userLogin));
  }

  render() {
    return (
      <div>
        <img src="/logo-white.png" alt="Logo" />
        <Search onChange={this.searchOnChange} />
      </div>
    );
  }
}

export default Header;

Header.propTypes = {
  searchOnChange: PropTypes.func
};
Header.defaultProps = {
  searchOnChange: () => {}
};
