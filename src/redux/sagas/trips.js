/* eslint-disable prettier/prettier */
import { takeLatest, all, put } from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {
    FETCH_UPCOMING_TRIPS,
    FETCH_PAST_TRIPS,
    EMAIL_AGENCY,
    setAuthorization,
    startLoader,
    stopLoader,
    saveDriverData,
    savePastTripList,
    saveUpcomingTripList,
} from '../actions';
const api = require('../../shared/api');
const { getRequest, postRequest } = require('../../helpers');
const { STATUS_CODE } = require('../../shared/constants');


function* getUpcomingTripList({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.FETCH_UPCOMING_TRIPS}` });
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
            yield put(saveUpcomingTripList(response.data.data));
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* getPastTripList({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.FETCH_PAST_TRIPS}` });
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
            yield put(savePastTripList(response.data.data));
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* emailAgency({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.EMAIL_AGENCY}`, DATA: data });
        if (response.data.statusCode === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(saveDriverData(null));
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.data.statusCode !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG);
        }
        else {
            success(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG);
        }
    }
    catch (error) {
        console.log('catch', error);
        return;
    }
}

function* TripSaga() {
    yield all([
        takeLatest(FETCH_UPCOMING_TRIPS, getUpcomingTripList),
        takeLatest(FETCH_PAST_TRIPS, getPastTripList),
        takeLatest(EMAIL_AGENCY, emailAgency),
    ]);
}

export default TripSaga;
