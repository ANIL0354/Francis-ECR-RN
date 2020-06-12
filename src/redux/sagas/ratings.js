/* eslint-disable prettier/prettier */
import { takeLatest, all, put } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import {
    FETCH_RATING_LIST,
    RATE_AGENCY,
    setAuthorization,
    startLoader,
    stopLoader,
    saveDriverData,
    saveRatingList,
} from '../actions';
const api = require('../../shared/api');
const { getRequest, putRequest } = require('../../helpers');
const { STATUS_CODE } = require('../../shared/constants');


function* getRatingList({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.FETCH_RATINGS_LIST}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(saveDriverData(null));
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

function* sendAgencyRating({ listingId, data, success, failure }) {
    try {
        yield put(startLoader());
        if (!data.commentForAgency) {
            delete data.commentForAgency;
        }
        if (!data.commentForECRByDriver) {
            delete data.commentForECRByDriver;
        }
        const response = yield putRequest({ API: `${api.URL.VEHICLE_LISTING}/${listingId}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(saveDriverData(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
        }
        else {
            success(response.data);
            Toast.show('Your rating was submitted successfully.', Toast.LONG);
            yield put(stopLoader());
        }
    }
    catch (error) {
        return;
    } finally {
        yield put(stopLoader());
    }
}

function* RatingSaga() {
    yield all([
        takeLatest(FETCH_RATING_LIST, getRatingList),
        takeLatest(RATE_AGENCY, sendAgencyRating),
    ]);
}

export default RatingSaga;
