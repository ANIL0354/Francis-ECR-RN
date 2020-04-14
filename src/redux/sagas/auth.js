import { takeLatest, all, put, delay } from "redux-saga/effects";
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    SOCIAL_LOGIN,
    REGISTER_USER,
    COMPLETE_USER_PROFILE,
    SEND_RECOVERY_EMAIL,
    setAuthorization,
    startLoader,
    saveUserInfo,
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
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.REGISTER_USER}`, DATA: data });
        if (response.data.statusCode === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
            return;
        }
        if (response.data.statusCode !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            success(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        console.log('catch', error)
        return;
    }
}

function* checkLogin({ data, success, failure }) {
    try {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.LOGIN}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            yield put(setAuthorization(response.data.data.token))
            success(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        console.log('catch', error)
        yield put(stopLoader());
        return;
    }
}

function* checkSocialLogin({ data, success, failure }) {
    try {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.SOCIAL_LOGIN}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            yield put(setAuthorization(response.data.data.token));
            yield put(saveUserInfo(response.data.data))
            success(response.data.msg);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        console.log('catch', error)
        yield put(stopLoader());
        return;
    }
};

function* sendRecoverPasswordEmail({ data, success, failure }) {
    try {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.FORGOT_PASSWORD}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            success(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        console.log('catch', error)
        yield put(stopLoader());
        return;
    }
};

function* completeUserProfile({ data, success, failure }) {
    try {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        const response = yield postRequest({ API: `${api.URL.CHALLENGES}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            return;
        }
        else if (response.status !== STATUS_CODE.successful) {
            failure(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
        else {
            success(response.data);
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        yield put(stopLoader());
        return;
    }
    finally {
        yield put(stopLoader());
    }
}


function* logoutUser({ token, success, failure }) {
    yield put(startLoader())
    try {
        NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                stopLoader();
                Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG, Toast.BOTTOM);
                return;
            }
        })
        const response = yield postRequest({ API: `${api.URL.LOGOUT}`, DATA: token });
        if (response.status === STATUS_CODE.unAuthorized) {

            yield put(setAuthorization(null));
            yield put(stopLoader());
            return;
        }
        if (response.status !== STATUS_CODE.successful) {

            yield put(setAuthorization(null));
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
            yield put(stopLoader());
        }
        else {
            yield put(setAuthorization(null));
            yield put(stopLoader());
            Toast.show(response.data.msg, Toast.LONG, Toast.BOTTOM);
        }
    }
    catch (error) {
        console.log('catch', error)
        yield put(stopLoader());
        return;
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(SET_AUTHORIZATION, setUserToken),
        takeLatest(CHECK_LOGIN, checkLogin),
        takeLatest(LOGOUT_USER, logoutUser),
        takeLatest(SOCIAL_LOGIN, checkSocialLogin),
        takeLatest(REGISTER_USER, registerNewUser),
        takeLatest(COMPLETE_USER_PROFILE, completeUserProfile),
        takeLatest(SEND_RECOVERY_EMAIL, sendRecoverPasswordEmail)
    ]);
}

export default AuthSaga;
