/* eslint-disable prettier/prettier */
import { takeLatest, all, put } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import {
    FETCH_RATING_LIST,
    setAuthorization,
    startLoader,
    stopLoader,
    saveRatingList,
} from '../actions';
const api = require('../../shared/api');
const { getRequest } = require('../../helpers');
const { STATUS_CODE } = require('../../shared/constants');


function* getRatingList({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.FETCH_RATINGS_LIST}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG);
        } else {
            yield put(stopLoader());
            yield put(saveRatingList(response.data.data));
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* RatingSaga() {
    yield all([
        takeLatest(FETCH_RATING_LIST, getRatingList),
    ]);
}

export default RatingSaga;
