import { put, call, takeLatest } from 'redux-saga/effects';
import { isUndefined } from 'lodash';
import CallApi from '../../Common/CallApi';
import CallUrl from '../../Common/CallUrl';
import {
  GITHUB_USERS_USER_DETAIL_FORM_SUCCESS,
  GITHUB_USERS_USER_DETAIL_FORM_FAILURE,
  GITHUB_USERS_USER_DETAIL_FORM_REQUEST,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_REQUEST,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_SUCCESS,
  GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_FAILURE
} from './actions';

function* UserDetailRequestSaga(param) {
  const { userLogin, userLogin: name } = param;
  const endpoint = `/users/${userLogin}`;
  try {
    const userDetailRequest = yield call(CallApi, 'get', `${endpoint}`);
    const userDetailData = userDetailRequest.data;
    const payload = { [name]: userDetailData };

    yield put({
      type: GITHUB_USERS_USER_DETAIL_FORM_SUCCESS,
      payload,
      name
    });
  } catch (error) {
    yield put({
      type: GITHUB_USERS_USER_DETAIL_FORM_FAILURE,
      name
    });
  }
}

function* UserDetailExtraInfoRequestSaga(param) {
  const { url, userLogin, userLogin: name } = param.param;

  if (isUndefined(url)) {
    const payload = { [name]: { userLogin, url, data: {} } };
    yield put({
      type: GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_SUCCESS,
      payload,
      name
    });
    return;
  }

  try {
    const userDetailRequest = yield call(CallUrl, 'get', `${url}`);
    const userDetailExtraInfoData = userDetailRequest.data;
    const payload = { [name]: { userLogin, url, data: userDetailExtraInfoData } };

    yield put({
      type: GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_SUCCESS,
      payload,
      name
    });
  } catch (error) {
    yield put({
      type: GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_FAILURE,
      name
    });
  }
}

export default function* UserDetailSaga() {
  yield takeLatest(GITHUB_USERS_USER_DETAIL_FORM_REQUEST, UserDetailRequestSaga);
  yield takeLatest(GITHUB_USERS_USER_DETAIL_EXTRA_INFO_FORM_REQUEST, UserDetailExtraInfoRequestSaga);
}
