/* eslint-disable prettier/prettier */
export const GET_POPULAR_PLACES = 'GET_POPULAR_PLACES';
export const SAVE_POPULAR_PLACES = 'SAVE_POPULAR_PLACES';
export const FETCH_VEHICLE_LISTING = 'FETCH_VEHICLE_LISTING';
export const SAVE_VEHICLE_LISTING = 'SAVE_VEHICLE_LISTING';
export const GET_FUEL_TYPES = 'GET_FUEL_TYPES';
export const GET_VEHICLE_TYPES = 'GET_VEHICLE_TYPES';
export const GET_TRANSMISSION_TYPES = 'GET_TRANSMISSION_TYPES';
export const SAVE_FUEL_TYPES = 'SAVE_FUEL_TYPES';
export const SAVE_TRANSMISSION_TYPES = 'SAVE_TRANSMISSION_TYPES';
export const SAVE_VEHICLE_TYPES = 'SAVE_VEHICLE_TYPES';
export const REFRESH_VEHICLE_LIST = 'REFRESH_VEHICLE_LIST';
export const FETCH_COMPLETE_DETAILS = 'FETCH_COMPLETE_DETAILS';
export const SAVE_COMPLETE_DETAILS = 'SAVE_COMPLETE_DETAILS';
export const SUBMIT_BOOKING_REQUEST = 'SUBMIT_BOOKING_REQUEST';

export const getFuelTypes = ({ data, success, failure }) => {
    return {
        type: GET_FUEL_TYPES,
        data,
        success,
        failure
    }
};

export const saveFuelTypes = data => {
    return {
        type: SAVE_FUEL_TYPES,
        data
    }
}

export const getVehicleTypes = ({ data, success, failure }) => {
    return {
        type: GET_VEHICLE_TYPES,
        data,
        success,
        failure
    }
};

export const saveVehicleTypes = data => {
    return {
        type: SAVE_VEHICLE_TYPES,
        data
    }
}

export const getTransmissionTypes = ({ data, success, failure }) => {
    return {
        type: GET_TRANSMISSION_TYPES,
        data,
        success,
        failure
    }
}

export const saveTransmissionTypes = data => {
    return {
        type: SAVE_TRANSMISSION_TYPES,
        data
    }
}

export const getPopularPlaces = ({ data, success, failure }) => {
    return {
        type: GET_POPULAR_PLACES,
        data,
        success,
        failure
    }
};

export const savePopularPlaces = data => {
    return {
        type: SAVE_POPULAR_PLACES,
        data
    }
};

export const fetchVehicleListing = (data, success, failure) => {
    return {
        type: FETCH_VEHICLE_LISTING,
        data,
        success,
        failure
    }
};

export const saveVehicleListing = data => {
    return {
        type: SAVE_VEHICLE_LISTING,
        data
    }
};

export const refreshVehicleList = () => {
    return {
        type: REFRESH_VEHICLE_LIST,
    }
};

export const fetchCompleteDetails = (id, success, failure) => {
    return {
        type: FETCH_COMPLETE_DETAILS,
        id,
        success,
        failure
    }
};

export const saveCompleteDetails = data => {
    return {
        type: SAVE_COMPLETE_DETAILS,
        data
    }
};

export const submitBookingRequest = (driverId, data, success, failure) => {
    return {
        type: SUBMIT_BOOKING_REQUEST,
        driverId,
        data,
        success,
        failure,
    };
};