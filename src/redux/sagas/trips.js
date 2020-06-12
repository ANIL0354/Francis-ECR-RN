/* eslint-disable prettier/prettier */
import { takeLatest, all, put } from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';
import {
    FETCH_UPCOMING_TRIPS,
    FETCH_PAST_TRIPS,
    EMAIL_AGENCY,
    CANCEL_TRIP,
    FETCH_CANCELLED_TRIPS,
    setAuthorization,
    startLoader,
    stopLoader,
    saveDriverData,
    saveCancelledTripList,
    savePastTripList,
    appendPastTripList,
    saveUpcomingTripList,
    appendUpcomingTripList,
    appendCancelledTripList,
} from '../actions';
const api = require('../../shared/api');
const { getRequest, postRequest, putRequest } = require('../../helpers');
const { STATUS_CODE } = require('../../shared/constants');


function* getUpcomingTripList({ data, success, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.FETCH_UPCOMING_TRIPS}?limit=${data.limit}&index=${data.index}` });
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
            if (data.index === 0) {
                yield put(saveUpcomingTripList(response.data.data));
            }
            else {
                yield put(appendUpcomingTripList(response.data.data));
            }
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* getPastTripList({ data, success, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.FETCH_PAST_TRIPS}?limit=${data.limit}&index=${data.index}` });
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
        }
        else {
            yield put(stopLoader());
            if (data.index === 0) {
                yield put(savePastTripList(response.data.data));
            }
            else {
                yield put(appendPastTripList(response.data.data));
            }
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* getCancelledTripList({ data, success, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.CANCELLED_TRIPS}?limit=${data.limit}&index=${data.index}` });
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
            if (data.index === 0) {
                yield put(saveCancelledTripList(response.data.data));
            }
            else {
                yield put(appendCancelledTripList(response.data.data));
            }
        }
    } catch (error) {
        console.log('catch', error);
        yield put(stopLoader());
        return;
    }
}

function* emailAgency({ data, success, failure }) {
    try {
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

function* cancelBooking({ listingId, data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield putRequest({ API: `${api.URL.VEHICLE_LISTING}/${listingId}/status`, DATA: data });
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
            Toast.show('Your trip has been cancelled.', Toast.LONG);
            yield put(stopLoader());
        }
    }
    catch (error) {
        return;
    } finally {
        yield put(stopLoader());
    }
}

function* TripSaga() {
    yield all([
        takeLatest(FETCH_UPCOMING_TRIPS, getUpcomingTripList),
        takeLatest(FETCH_PAST_TRIPS, getPastTripList),
        takeLatest(EMAIL_AGENCY, emailAgency),
        takeLatest(CANCEL_TRIP, cancelBooking),
        takeLatest(FETCH_CANCELLED_TRIPS, getCancelledTripList),
    ]);
}

export default TripSaga;
