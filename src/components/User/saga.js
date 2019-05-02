import { takeEvery } from 'redux-saga/effects';
import { GITHUB_USERS_USER_FORM_REQUEST } from './Detail/actions';
import UserDetailRequestSaga from './Detail/saga';

function* UserSaga() {
  yield takeEvery(GITHUB_USERS_USER_FORM_REQUEST, UserDetailRequestSaga);
}

export default UserSaga;
