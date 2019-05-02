import { put } from 'redux-saga/effects';
import { GITHUB_USERS_USER_FORM_SUCCESS } from './actions';

function* UserDetailSaga() {
  yield put({
    type: GITHUB_USERS_USER_FORM_SUCCESS,
    payload: {}
  });
}

export default UserDetailSaga;
