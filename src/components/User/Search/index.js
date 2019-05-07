import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from '../../Common/AutoSuggest';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { userLogin: '' };
    this.autoSuggestValue = this.autoSuggestValue.bind(this);
  }

  autoSuggestValue(data) {
    this.setState({ userLogin: data.value }, () => this.props.onChange(this.state.userLogin));
  }

  render() {
    const { userLogin } = this.state;
    return (
      <div>
        <AutoSuggest
          name="userName"
          onSetSelectedValue={this.autoSuggestValue}
          placeholder="Nome do usuário"
          async
          endpoint="/search/users"
          query="?q="
          objectapi="items"
          labelapi="login"
          valueapi="login"
          initvalue={userLogin}
        />
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  onChange: PropTypes.func
};
Search.defaultProps = {
  onChange: () => {}
};
