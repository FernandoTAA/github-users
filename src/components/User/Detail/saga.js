import { put, call, takeLatest } from 'redux-saga/effects';
import CallApi from '../../Common/CallApi';
import { GITHUB_USERS_USER_FORM_SUCCESS, GITHUB_USERS_USER_FORM_FAILURE, GITHUB_USERS_USER_FORM_REQUEST } from './actions';

function* UserDetailRequestSaga(param) {
  const { userLogin, userLogin: name } = param;
  const endpoint = `/users/${userLogin}`;
  try {
    const payload = {};
    const userDetailRequest = yield call(CallApi, 'get', `${endpoint}`);
    const userDetailData = userDetailRequest.data;
    payload[name] = userDetailData;

    yield put({
      type: GITHUB_USERS_USER_FORM_SUCCESS,
      payload,
      name
    });
  } catch (error) {
    yield put({
      type: GITHUB_USERS_USER_FORM_FAILURE,
      name
    });
  }
}

export default function* UserDetailSaga() {
  yield takeLatest(GITHUB_USERS_USER_FORM_REQUEST, UserDetailRequestSaga);
}
