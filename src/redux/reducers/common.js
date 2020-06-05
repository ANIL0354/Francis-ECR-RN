/* eslint-disable prettier/prettier */
import { REHYDRATE } from 'redux-persist';
import {
    SET_AUTHORIZATION,
    SAVE_USER_INFO,
    STOP_LOADER,
    START_LOADER,
    SET_GPS_ENABLED,
    UPDATE_INTERNET_STATUS,
    SET_LOCATION_ENABLED,
    SET_NEVER_ASK_PERMISSION,
    SET_CHILD_SEATS_VALUE,
    SET_ADULT_SEATS_VALUE,
    SET_FREE_DAYS,
    SET_VEHICLE_TYPE,
    SET_TRANSMISSION_TYPE,
    SET_FUEL_TYPE,
    SET_PICKUP_LOCATION,
    SET_PICKUP_DATE,
    SET_DROPOFF_LOCATION,
    SAVE_FAQ_LIST,
    SAVE_DRIVER_DATA,
    SAVE_PROFILE_DATA,
} from '../actions';

const { updateAuthToken } = require('../../helpers');

const initialCommonState = {
    userToken: '',
    userInfo: null,
    loader: false,
    gpsEnabled: false,
    locationEnabled: false,
    isNetConnected: true,
    neverAskPermission: false,
    childSeatsValue: 0,
    adultSeatsValue: 0,
    freeDays: 0,
    vehicleType: new Set(),
    transmissionType: new Set(),
    fuelType: new Set(),
    pickupLocation: '',
    dropOffLocation: '',
    pickupDate: null,
    faqList: null,
    driverData: null,
    profileData: null,
};

const CommonReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_AUTHORIZATION:
            return {
                ...state,
                userToken: action.userToken,
            };
        case START_LOADER:
            return {
                ...state,
                loader: true,
            };
        case STOP_LOADER:
            return {
                ...state,
                loader: false,
            };
        case SAVE_USER_INFO:
            return {
                ...state,
                userInfo: action.data,
            };
        case UPDATE_INTERNET_STATUS:
            return {
                ...state,
                isNetConnected: action.isNetConnected,
            };
        case SET_GPS_ENABLED:
            return {
                ...state,
                gpsEnabled: action.gpsEnabled || false,
            };
        case SET_LOCATION_ENABLED:
            return {
                ...state,
                locationEnabled: action.locationEnabled || false,
            };
        case SET_NEVER_ASK_PERMISSION:
            return {
                ...state,
                neverAskPermission: action.neverAskPermission || false,
            };
        case SET_FUEL_TYPE:
            return {
                ...state,
                fuelType: action.value,
            };
        case SET_TRANSMISSION_TYPE:
            return {
                ...state,
                transmissionType: action.value,
            };
        case SET_VEHICLE_TYPE:
            return {
                ...state,
                vehicleType: action.value,
            };
        case SET_FREE_DAYS:
            return {
                ...state,
                freeDays: action.value,
            };
        case SET_CHILD_SEATS_VALUE:
            return {
                ...state,
                childSeatsValue: action.value,
            };
        case SET_ADULT_SEATS_VALUE:
            return {
                ...state,
                adultSeatsValue: action.value,
            };
        case SET_PICKUP_LOCATION:
            return {
                ...state,
                pickupLocation: action.value,
            };
        case SET_DROPOFF_LOCATION:
            return {
                ...state,
                dropOffLocation: action.value,
            };
        case SET_PICKUP_DATE:
            return {
                ...state,
                pickupDate: action.value,
            };
        case SAVE_FAQ_LIST:
            return {
                ...state,
                faqList: action.data,
            };
        case SAVE_DRIVER_DATA:
            return {
                ...state,
                driverData: action.data,
            };
        case SAVE_PROFILE_DATA:
            return {
                ...state,
                profileData: action.data,
            };
        case REHYDRATE:
            let common = ((action || {}).payload || {}).CommonReducer || initialCommonState;
            updateAuthToken(common.userToken || '');
            return {
                ...state,
                userToken: common.userToken,
                driverData: common.driverData,
                ...(action.payload || {}).common,
            };
        default:
            return state;
    }
};

export default CommonReducer;
