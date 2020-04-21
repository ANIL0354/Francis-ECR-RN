import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ListsSaga from './listing';

function* dataSaga() {
  yield all([
    fork(AuthSaga),
    fork(ListsSaga)
  ]);
}


export default dataSaga;
