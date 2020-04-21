import { takeLatest, all, put, delay } from "redux-saga/effects";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {
    GET_POPULAR_PLACES,
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
            // failure(response.data);
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            // success(response.data);
            yield put(savePopularPlaces(response.data.data))
            // Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
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
    ]);
}

export default ListsSaga;
