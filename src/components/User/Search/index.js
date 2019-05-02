import React, { Component } from 'react';
import AutoSuggest from '../../Common/AutoSuggest';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // autoSuggestValue(data) {
  // this.setState({ id: data.value, name: data.name }, () => this.props.onChange(this.state));
  // }

  render() {
    return (
      <div>
        Search
        <AutoSuggest
          name="userName"
          // onSetSelectedValue={this.autoSuggestValue}
          placeholder="Nome do usuário"
          async
          endpoint="/search/users"
          query="?q="
          objectapi="items"
          labelapi="login"
          valueapi="login"
          initvalue=""
        />
      </div>
    );
  }
}

export default Search;
