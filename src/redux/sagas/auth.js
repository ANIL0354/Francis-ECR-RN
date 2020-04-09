import { takeLatest, all, put, delay } from "redux-saga/effects";

import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    REGISTER_USER,
    setAuthorization,
    startLoader,
    stopLoader,
    LOGOUT_USER,
} from '../actions';
const { defaultConfig: { LOCATION } } = require(`../../config/default`);
const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, postRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);

function* setUserToken({ userToken }) {
    try {
        yield updateAuthToken(userToken);
    }
    catch (error) {
        return;
    }
}

function* registerNewUser({ data, success, failure }) {
    try {
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.REGISTER_USER}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
        }
        else {
            success(response.data);
            yield put(stopLoader());
        }
    }
    catch (error) {
        console.log('catch', error)
        return;
    }
}

function* checkLogin({ credentials, success, failure }) {
    try {
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.LOGIN}`, DATA: credentials });
        console.log(response)
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
        }
        else {
            yield put(setAuthorization(response.data.data.token));
            yield put(setPlatformType(response.data.data.role));
            yield put(saveChampionship(response.data.data.championship))
            success(response.data);
            yield put(stopLoader());
        }
    }
    catch (error) {
        return;
    }
}


function* logoutUser({ token, success }) {

    try {
        const response = yield postRequest({ API: `${api.URL.LOGOUT}`, DATA: {} });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            yield put(setAuthorization(null))
        }
        else {
            success();
        }
    }
    catch (error) {
        return;
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(SET_AUTHORIZATION, setUserToken),
        takeLatest(CHECK_LOGIN, checkLogin),
        takeLatest(LOGOUT_USER, logoutUser),
        takeLatest(REGISTER_USER, registerNewUser)
    ]);
}

export default AuthSaga;
