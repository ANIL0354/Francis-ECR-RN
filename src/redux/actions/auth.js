export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const COMPLETE_USER_PROFILE = 'COMPLETE_USER_PROFILE';
export const SEND_RECOVERY_EMAIL = 'SEND_RECOVERY_EMAIL';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const SAVE_PROFILE_DATA = 'SAVE_PROFILE_DATA';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const setAuthorization = (userToken) => {
    return {
        type: SET_AUTHORIZATION,
        userToken
    };
};

export const checkLogin = (data, success, failure) => {
    return {
        type: CHECK_LOGIN,
        data,
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

export const saveUserInfo = (data) => {
    return {
        type: SAVE_USER_INFO,
        data
    }
};

export const completeProfile = (data, success, failure) => {
    return {
        type: COMPLETE_USER_PROFILE,
        data, success, failure
    }
}

export const registerUser = (data, success, failure) => {
    return {
        type: REGISTER_USER,
        data,
        success,
        failure
    }
};

export const sendRecoveryEmail = (data, success, failure) => {
    return {
        type: SEND_RECOVERY_EMAIL,
        data,
        success,
        failure
    }
}

export const logout = (token, success, failure) => {
    return {
        type: LOGOUT_USER, token, success, failure
    }
};

export const fetchProfile = (success, failure) => {
    return {
        type: FETCH_PROFILE,
        success,
        failure,
    };
};

export const saveProfileData = data => {
    return {
        type: SAVE_PROFILE_DATA,
        data,
    };
};

export const changePassword = (data, success, failure) => {
    return {
        type: CHANGE_PASSWORD,
        data,
        success,
        failure,
    };
};
