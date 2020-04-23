import { takeLatest, all, put, delay } from "redux-saga/effects";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {
    GET_POPULAR_PLACES,
    FETCH_VEHICLE_LISTING,
    setAuthorization,
    startLoader,
    stopLoader,
    savePopularPlaces
} from '../actions';
const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, getRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);


function* fetchPopularPlaces({ data, success, failure }) {
    try {
        const response = yield getRequest({ API: `${api.URL.POPULAR_PLACES}?limit=6&sortOrder=1` });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            yield put(savePopularPlaces(response.data.data))
        }
    }
    catch (error) {
        console.log('catch', error)
        return;
    }
}

function* fetchVehicleList({ data, success, failure }) {
    try {
        console.log('pickupDate', data.pickupDate);
        let { fromCity, pickupDate, fuelType, limit, index } = data;
        const response = yield getRequest({ API: `${api.URL.VEHICLE_LISTING}?fromCity=${fromCity}&pickupDate=${pickupDate}&fuelType=${fuelType}&limit=${limit}6&index=${index}` });
        console.log('response', response);
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure();
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            success();
        }
    }
    catch (error) {
        console.log('catch', error)
        return;
    }
}

function* ListsSaga() {
    yield all([
        takeLatest(GET_POPULAR_PLACES, fetchPopularPlaces),
        takeLatest(FETCH_VEHICLE_LISTING, fetchVehicleList)
    ]);
}

export default ListsSaga;