import { put } from 'redux-saga/effects';
import { GITHUB_USERS_USER_FORM_SUCCESS } from './actions';

function* UserDetailRequestSaga() {
  yield put({
    type: GITHUB_USERS_USER_FORM_SUCCESS,
    payload: {}
  });
}

export default UserDetailRequestSaga;
