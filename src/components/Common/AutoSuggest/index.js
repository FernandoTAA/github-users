import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import M from 'materialize-css';
import { map, debounce } from 'lodash';
import { AutoSuggestRequestAction } from './actions';
import { getSuggestions, shouldRenderSuggestions } from './helpers';

class AutoSuggest extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
    this.cache = {
      [this.state.value]: this.state.suggestions
    };
    this.debouncedLoadSuggestions = debounce(this.loadSuggestions, 250);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
  }

  componentDidMount() {
    M.FormSelect.init(document.querySelectorAll('.react-autosuggest__suggestions-list'));
    const { initvalue } = this.props;
    this.setState({ value: initvalue });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: typeof newValue !== 'undefined' ? newValue : ''
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.debouncedLoadSuggestions(value);
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionSelected(event, { suggestion }) {
    this.props.onSetSelectedValue(suggestion);
  }

  loadSuggestions(value) {
    const { name, endpoint, query, labelapi, valueapi, objectapi } = this.props;
    const cacheKey = value.trim().toLowerCase();
    if (this.cache[cacheKey]) {
      this.setState({
        suggestions: this.cache[cacheKey]
      });
    }
    return this.props.async
      ? (this.props.AutoSuggestRequestAction({
          name,
          endpoint,
          query,
          labelapi,
          valueapi,
          objectapi,
          value
        }),
        this.setState({
          suggestions: getSuggestions(value, this.props.autoSuggestions)
        }))
      : this.setState({
          suggestions: getSuggestions(
            value,
            map(this.props.timezones, timezone => ({
              name: timezone,
              value: timezone
            }))
          )
        });
  }

  render() {
    const { value } = this.state;
    const { loading, required, name, placeholder, autoSuggestions } = this.props;

    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
      name,
      className: 'form-control',
      required
    };

    const status = loading ? (
      <div className="github-users-autosuggest-loading">
        <i className="fa fa-spinner fa-spin " />
      </div>
    ) : (
      ''
    );

    return (
      <div>
        <Autosuggest
          suggestions={autoSuggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          shouldRenderSuggestions={shouldRenderSuggestions}
          getSuggestionValue={suggestion => suggestion.name}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={suggestion => <div>{suggestion.name}</div>}
          inputProps={inputProps}
          id={name}
        />
        {status}
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    autoSuggestions: state.autosuggest.data[ownProps.name],
    loading: state.autosuggest.status[ownProps.name] ? state.autosuggest.status[ownProps.name].loading : false,
    failure: state.autosuggest.status[ownProps.name] ? state.autosuggest.status[ownProps.name].failure : false
  }),
  { AutoSuggestRequestAction }
)(AutoSuggest);

AutoSuggest.propTypes = {
  autoSuggestions: PropTypes.arrayOf(PropTypes.objectOf),
  async: PropTypes.bool,
  endpoint: PropTypes.string,
  AutoSuggestRequestAction: PropTypes.func,
  onSetSelectedValue: PropTypes.func,
  name: PropTypes.string,
  labelapi: PropTypes.string,
  loading: PropTypes.bool,
  query: PropTypes.string,
  objectapi: PropTypes.string,
  required: PropTypes.bool,
  timezones: PropTypes.arrayOf(PropTypes.objectOf),
  valueapi: PropTypes.string,
  placeholder: PropTypes.string,
  initvalue: PropTypes.string
};
AutoSuggest.defaultProps = {
  autoSuggestions: [],
  async: false,
  endpoint: '',
  AutoSuggestRequestAction: '',
  onSetSelectedValue: '',
  name: '',
  labelapi: '',
  loading: false,
  query: '',
  objectapi: '',
  required: false,
  timezones: [],
  valueapi: '',
  placeholder: '',
  initvalue: ''
};
