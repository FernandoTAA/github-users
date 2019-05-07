import { GITHUB_USERS_USER_FORM_REQUEST, GITHUB_USERS_USER_FORM_SUCCESS, GITHUB_USERS_USER_FORM_FAILURE } from './actions';

const userdetail = (
  state = {
    data: {},
    status: {}
  },
  action
) => {
  const { status } = state;
  switch (action.type) {
    case GITHUB_USERS_USER_FORM_REQUEST: {
      status[action.userLogin] = {
        failure: false,
        loading: true
      };
      return {
        data: {},
        status
      };
    }
    case GITHUB_USERS_USER_FORM_SUCCESS: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: action.payload,
        status
      };
    }
    case GITHUB_USERS_USER_FORM_FAILURE: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: state.data,
        status
      };
    }
    default:
      return state;
  }
};

export default userdetail;
