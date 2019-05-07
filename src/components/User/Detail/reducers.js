import {
  GITHUB_USERS_USER_DETAIL_FORM_REQUEST,
  GITHUB_USERS_USER_DETAIL_FORM_SUCCESS,
  GITHUB_USERS_USER_DETAIL_FORM_FAILURE,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_REQUEST,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_SUCCESS,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_FAILURE
} from './actions';

const userdetail = (
  state = {
    data: {},
    dataExtraInfo: {},
    status: {}
  },
  action
) => {
  const { status } = state;
  switch (action.type) {
    case GITHUB_USERS_USER_DETAIL_FORM_REQUEST: {
      status[action.userLogin] = {
        failure: false,
        loading: true
      };
      return {
        data: {},
        dataExtraInfo: state.dataExtraInfo,
        status
      };
    }
    case GITHUB_USERS_USER_DETAIL_FORM_SUCCESS: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: action.payload,
        dataExtraInfo: state.dataExtraInfo,
        status
      };
    }
    case GITHUB_USERS_USER_DETAIL_FORM_FAILURE: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: state.data,
        dataExtraInfo: state.dataExtraInfo,
        status
      };
    }
    case GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_REQUEST: {
      status[action.userLogin] = {
        failure: false,
        loading: true
      };
      return {
        data: state.data,
        dataExtraInfo: {},
        status
      };
    }
    case GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_SUCCESS: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: state.data,
        dataExtraInfo: action.payload,
        status
      };
    }
    case GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_FAILURE: {
      status[action.name] = {
        failure: false,
        loading: true
      };
      return {
        data: state.data,
        dataExtraInfo: state.dataExtraInfo,
        status
      };
    }
    default:
      return state;
  }
};

export default userdetail;
