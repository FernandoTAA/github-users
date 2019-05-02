import { isEmpty, mergeWith } from 'lodash';
import { GITHUB_USERS_FIELD_AUTOSUGGEST_REQUEST, GITHUB_USERS_FIELD_AUTOSUGGEST_SUCCESS, GITHUB_USERS_FIELD_AUTOSUGGEST_FAILURE } from './actions';

const autosuggest = (
  state = {
    data: {},
    status: {}
  },
  action
) => {
  switch (action.type) {
    case GITHUB_USERS_FIELD_AUTOSUGGEST_REQUEST: {
      const { status } = state;
      status[action.field.name] = {
        failure: false,
        loading: true
      };
      return {
        data: {},
        status
      };
    }

    case GITHUB_USERS_FIELD_AUTOSUGGEST_SUCCESS: {
      const { status } = state;
      const payload = isEmpty(state.data) ? action.payload : mergeWith(state.data, action.payload);
      status[action.name] = {
        failure: false,
        loading: false
      };
      return {
        data: payload,
        status
      };
    }

    case GITHUB_USERS_FIELD_AUTOSUGGEST_FAILURE: {
      const { status } = state;
      status[action.params.name] = {
        failure: true,
        loading: false
      };
      return {
        data: state.data
      };
    }
    default:
      return state;
  }
};

export default autosuggest;
