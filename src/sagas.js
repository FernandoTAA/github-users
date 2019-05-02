import 'regenerator-runtime/runtime';
import { fork } from 'redux-saga/effects';
import AutoSuggestSaga from './components/Common/AutoSuggest/sagas';
import UserSaga from './components/User/saga';

function* rootSaga() {
  yield fork(AutoSuggestSaga);
  yield fork(UserSaga);
}

export default rootSaga;
