import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ListsSaga from './listing';
import TripSaga from './trips';
import RatingSaga from './ratings';

function* dataSaga() {
  yield all([
    fork(AuthSaga),
    fork(ListsSaga),
    fork(TripSaga),
    fork(RatingSaga),
  ]);
}


export default dataSaga;
