import 'regenerator-runtime/runtime';
import { fork } from 'redux-saga/effects';
import UserSaga from './components/User/saga';

function* rootSaga() {
  yield fork(UserSaga);
}

export default rootSaga;
