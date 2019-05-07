import UserDetailSaga from './Detail/saga';

function* UserSaga() {
  yield UserDetailSaga();
}

export default UserSaga;
