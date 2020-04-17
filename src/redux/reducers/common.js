import { REHYDRATE } from "redux-persist";
import {
    SET_AUTHORIZATION,
    SAVE_USER_INFO,
    REMEMBER_ME,
    SET_PLATFORM_TYPE,
    STOP_LOADER,
    START_LOADER,
    SET_GPS_ENABLED,
    UPDATE_INTERNET_STATUS,
    SET_LOCATION_ENABLED,
    SET_NEVER_ASK_PERMISSION,
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../config/default`);
const { updateAuthToken } = require(`../../helpers`);

const initialCommonState = {
    userToken: '',
    userInfo: null,
    platformType: null,
    rememberCredentials: null,
    loader: false,
    gpsEnabled: false,
    locationEnabled: false,
    isNetConnected: true,
    neverAskPermission: false,
};

const CommonReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_AUTHORIZATION:
            return {
                ...state,
                userToken: action.userToken
            };
        case START_LOADER:
            return {
                ...state,
                loader: true
            }
        case STOP_LOADER:
            return {
                ...state,
                loader: false
            }
        case SET_PLATFORM_TYPE:
            return {
                ...state,
                platformType: action.role
            }
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data
            }
        case REMEMBER_ME:
            return {
                ...state,
                rememberCredentials: action.credentials
            }
        case UPDATE_INTERNET_STATUS:
            return {
                ...state,
                isNetConnected: action.isNetConnected
            };
        case SET_GPS_ENABLED:
            return {
                ...state,
                gpsEnabled: action.gpsEnabled || false
            }
        case SET_LOCATION_ENABLED:
            return {
                ...state,
                locationEnabled: action.locationEnabled || false
            }
        case SET_NEVER_ASK_PERMISSION:
            return {
                ...state,
                neverAskPermission: action.neverAskPermission || false
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).CommonReducer || initialCommonState
            updateAuthToken(common.userToken || '');
            return {
                ...state,
                userToken: common.userToken,
                platformType: common.platformType,
                rememberCredentials: common.rememberCredentials,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default CommonReducer;