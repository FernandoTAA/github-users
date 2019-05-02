import { takeEvery } from 'redux-saga/effects';
import { GITHUB_USERS_USER_FORM_REQUEST } from './Detail/actions';
import UserDetailSaga from './Detail/saga';

function* UserSaga() {
  yield takeEvery(GITHUB_USERS_USER_FORM_REQUEST, UserDetailSaga);
}

export default UserSaga;
