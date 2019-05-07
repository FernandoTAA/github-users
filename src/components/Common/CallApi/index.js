import { call } from 'redux-saga/effects';
import CallUrl from '../CallUrl';
import config from '../../../config.json';

function* CallApi(method, endpoint, data, type, responsetype) {
  const { apiEndpoint } = config;
  const callResponse = yield call(CallUrl, method, `${apiEndpoint}${endpoint}`, data, type, responsetype);
  return callResponse;
}

export default CallApi;
