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
    SET_SEATS_VALUE,
    SET_FREE_DAYS,
    SET_VEHICLE_TYPE,
    SET_TRANSMISSION_TYPE,
    SET_FUEL_TYPE,
    SET_PICKUP_LOCATION,
    SET_PICKUP_DATE
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
    seatsValue: 0,
    freeDays: 0,
    vehicleType: 0,
    transmissionType: 0,
    fuelType: 0,
    pickupLocation: '',
    pickupDate: null
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
        case SET_FUEL_TYPE:
            return {
                ...state,
                fuelType: action.value
            }
        case SET_TRANSMISSION_TYPE:
            return {
                ...state,
                transmissionType: action.value
            }
        case SET_VEHICLE_TYPE:
            return {
                ...state,
                vehicleType: action.value
            }
        case SET_FREE_DAYS:
            return {
                ...state,
                freeDays: action.value
            }
        case SET_SEATS_VALUE:
            return {
                ...state,
                seatsValue: action.value
            }
        case SET_PICKUP_LOCATION:
            return {
                ...state,
                pickupLocation: action.value
            }
        case SET_PICKUP_DATE:
            return {
                ...state,
                pickupDate: action.value
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