export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';

export const setAuthorization = (userToken) => {
    return {
        type: SET_AUTHORIZATION,
        userToken
    };
};

export const checkLogin = (credentials, success, failure) => {
    return {
        type: CHECK_LOGIN,
        credentials,
        success,
        failure
    }
};

export const socialLogin = (data, success, failure) => {
    return {
        type: SOCIAL_LOGIN,
        data,
        success,
        failure
    }
}

export const registerUser = (data, success, failure) => {
    return {
        type: REGISTER_USER,
        data,
        success,
        failure
    }
}

export const logout = (token, success) => {
    return {
        type: LOGOUT_USER,
        token,
        success
    }
};