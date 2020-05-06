import { takeLatest, all, put, delay } from "redux-saga/effects";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {
    GET_POPULAR_PLACES,
    FETCH_VEHICLE_LISTING,
    GET_FUEL_TYPES,
    GET_TRANSMISSION_TYPES,
    GET_VEHICLE_TYPES,
    setAuthorization,
    saveVehicleTypes,
    startLoader,
    stopLoader,
    savePopularPlaces,
    saveFuelTypes,
    saveVehicleListing,
    saveTransmissionTypes
} from '../actions';
const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, getRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);


function* fetchPopularPlaces({ data, success, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.POPULAR_PLACES}?limit=6&sortOrder=-1` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            stopLoader();
            Toast.show(response.data.msg, Toast.LONG);
        }
        else {
            yield put(savePopularPlaces(response.data.data))
        }
    }
    catch (error) {
        console.log('catch', error);
        stopLoader();
        return;
    }
}

function* fetchVehicleList({ data, success, failure }) {
    try {
        let { fromCity, pickupDate, fuelType, adultSeats, childSeats, limit, index } = data;
        const response = yield getRequest({ API: `${api.URL.VEHICLE_LISTING}?fromCity=${fromCity}&limit=${limit}&index=${index}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            stopLoader();
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure();
            Toast.show(response.data.msg, Toast.LONG);
            stopLoader();
        }
        else {
            yield put(saveVehicleListing(response.data.data))
            success();
        }
    }
    catch (error) {
        console.log('catch', error)
        stopLoader();
        return;
    }
}

function* fetchFuelTypes({ data, success = () => { }, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.FUEL_LISTING}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            stopLoader();
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure();
            Toast.show(response.data.msg, Toast.LONG);
            stopLoader();
        }
        else {
            yield put(saveFuelTypes(response.data.data))
            success();
        }
    }
    catch (error) {
        console.log('catch', error)
        stopLoader();
        return;
    }
}

function* fetchTranmissionTypes({ data, success = () => { }, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.TRANSMISSION_LISTING}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            stopLoader();
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure();
            Toast.show(response.data.msg, Toast.LONG);
            stopLoader();
        }
        else {
            yield put(saveTransmissionTypes(response.data.data))
            success();
        }
    }
    catch (error) {
        console.log('catch', error)
        stopLoader();
        return;
    }
};

function* fetchVehicleTypes({ data, success = () => { }, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.VEHICLE_TYPE_LISTING}` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            stopLoader();
            Toast.show(response.data.msg, Toast.LONG);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure();
            Toast.show(response.data.msg, Toast.LONG);
            stopLoader();
        }
        else {
            yield put(saveVehicleTypes(response.data.data))
            success();
        }
    }
    catch (error) {
        console.log('catch', error)
        stopLoader();
        return;
    }
}

function* ListsSaga() {
    yield all([
        takeLatest(GET_POPULAR_PLACES, fetchPopularPlaces),
        takeLatest(FETCH_VEHICLE_LISTING, fetchVehicleList),
        takeLatest(GET_FUEL_TYPES, fetchFuelTypes),
        takeLatest(GET_TRANSMISSION_TYPES, fetchTranmissionTypes),
        takeLatest(GET_VEHICLE_TYPES, fetchVehicleTypes)
    ]);
}

export default ListsSaga;
