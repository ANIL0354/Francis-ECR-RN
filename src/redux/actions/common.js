export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';
export const UPDATE_INTERNET_STATUS = 'UPDATE_INTERNET_STATUS';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SET_NEVER_ASK_PERMISSION = 'SET_NEVER_ASK_PERMISSION';
export const SET_GPS_ENABLED = 'SET_GPS_ENABLED';
export const SET_LOCATION_ENABLED = 'SET_LOCATION_ENABLED';

export const setUserLocation = userLocation => ({
    type: SET_USER_LOCATION,
    userLocation
});

export const setNeverAskPermission = neverAskPermission => ({
    type: SET_NEVER_ASK_PERMISSION,
    neverAskPermission
});

export const setGpsEnabled = gpsEnabled => ({
    type: SET_GPS_ENABLED,
    gpsEnabled
});

export const setLocationEnabled = locationEnabled => ({
    type: SET_LOCATION_ENABLED,
    locationEnabled
});

export const updateInternetStatus = (status) => {
    return {
        type: UPDATE_INTERNET_STATUS,
        isNetConnected: status
    };
}

export const startLoader = () => {
    return {
        type: START_LOADER,
    };
}

export const stopLoader = () => {
    return {
        type: STOP_LOADER,
    };
}