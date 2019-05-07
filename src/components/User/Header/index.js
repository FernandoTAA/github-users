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
      <nav>
        <div className="nav-wrapper grey darken-4">
          <div className="col s12 header-container">
            <img src="/logo-white.png" alt="Logo" className="header-logo" />
            <div className="header-search">
              <Search onChange={this.searchOnChange} />
            </div>
          </div>
        </div>
      </nav>
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
