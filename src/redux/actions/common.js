export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';
export const UPDATE_INTERNET_STATUS = 'UPDATE_INTERNET_STATUS';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SET_NEVER_ASK_PERMISSION = 'SET_NEVER_ASK_PERMISSION';
export const SET_GPS_ENABLED = 'SET_GPS_ENABLED';
export const SET_LOCATION_ENABLED = 'SET_LOCATION_ENABLED';
export const SET_CHILD_SEATS_VALUE = 'SET_CHILD_SEATS_VALUE';
export const SET_ADULT_SEATS_VALUE = 'SET_ADULT_SEATS_VALUE';
export const SET_FREE_DAYS = 'SET_FREE_DAYS';
export const SET_VEHICLE_TYPE = 'SET_VEHICLE_TYPE';
export const SET_TRANSMISSION_TYPE = 'SET_TRANSMISSION_TYPE';
export const SET_FUEL_TYPE = 'SET_FUEL_TYPE';
export const SET_PICKUP_LOCATION = 'SET_PICKUP_LOCATION';
export const SET_PICKUP_DATE = 'SET_PICKUP_DATE';
export const SET_DROPOFF_LOCATION = 'SET_DROPOFF_LOCATION';

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
};

export const setFuelType = value => {
    return {
        type: SET_FUEL_TYPE,
        value
    }
};

export const setTransmissionType = value => {
    return {
        type: SET_TRANSMISSION_TYPE,
        value
    }
};

export const setVehicleType = value => {
    return {
        type: SET_VEHICLE_TYPE,
        value
    }
};

export const setFreeDays = value => {
    return {
        type: SET_FREE_DAYS,
        value
    }
};

export const setChildSeats = value => {
    return {
        type: SET_CHILD_SEATS_VALUE,
        value
    }
};

export const setAdultSeats = value => {
    return {
        type: SET_ADULT_SEATS_VALUE,
        value
    }
};

export const setPickupLocation = value => {
    return {
        type: SET_PICKUP_LOCATION,
        value
    }
};

export const setDropoffLocation = value => {
    return {
        type: SET_DROPOFF_LOCATION,
        value
    }
}

export const setPickupDate = value => {
    return {
        type: SET_PICKUP_DATE,
        value
    }
}