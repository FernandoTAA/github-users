import { takeLatest, call, put } from 'redux-saga/effects';
import { map } from 'lodash';
import CallApi from '../CallApi';

import { GITHUB_USERS_FIELD_AUTOSUGGEST_REQUEST, GITHUB_USERS_FIELD_AUTOSUGGEST_SUCCESS, GITHUB_USERS_FIELD_AUTOSUGGEST_FAILURE } from './actions';

export function* AutoSuggestRequestSaga(data) {
  const {
    field: { endpoint, labelapi, name, objectapi, query, value, valueapi, limitResult }
  } = data;
  try {
    const autoSuggestRequest = yield call(CallApi, 'get', `${endpoint}${query}${value}`);
    const autoSuggestValues = !endpoint
      ? map(autoSuggestRequest.data.userAccounts, autoSuggestValue => ({
          name: autoSuggestValue.basicInfo.fullName,
          value: autoSuggestValue.id
        }))
      : map(autoSuggestRequest.data[objectapi], autoSuggestValueObject => ({
          name: labelapi
            .split(',')
            .map(labelapiunique => labelapiunique.split('.').reduce((obj, attr) => obj[attr], autoSuggestValueObject))
            .reduce((acc, cur) => `${acc} ${cur}`),
          value: autoSuggestValueObject[valueapi]
        }));
    const autoSuggestValuesFinal = !limitResult ? autoSuggestValues : autoSuggestValues.slice(0, limitResult);

    yield put({
      type: GITHUB_USERS_FIELD_AUTOSUGGEST_SUCCESS,
      payload: { [name]: autoSuggestValuesFinal },
      name
    });
  } catch (error) {
    yield put({
      type: GITHUB_USERS_FIELD_AUTOSUGGEST_FAILURE,
      name
    });
  }
}

export default function* AutoSuggestSaga() {
  yield takeLatest(GITHUB_USERS_FIELD_AUTOSUGGEST_REQUEST, AutoSuggestRequestSaga);
}
