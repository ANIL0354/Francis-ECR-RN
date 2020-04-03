import { REHYDRATE } from "redux-persist";
import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    REMEMBER_ME,
    SET_PLATFORM_TYPE,
    STOP_LOADER,
    START_LOADER,
    SAVE_CHAMPIONSHIP
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    userToken: '',
    platformType: null,
    rememberCredentials: null,
    loader: false,
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
        case CHECK_LOGIN:
            return {
                ...state,
            }
        case REMEMBER_ME:
            return {
                ...state,
                rememberCredentials: action.credentials
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