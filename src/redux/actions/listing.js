export const GET_POPULAR_PLACES = 'GET_POPULAR_PLACES';
export const SAVE_POPULAR_PLACES = 'SAVE_POPULAR_PLACES';
export const FETCH_VEHICLE_LISTING = 'FETCH_VEHICLE_LISTING';
export const SAVE_VEHICLE_LISTING = 'SAVE_VEHICLE_LISTING';
export const GET_FUEL_TYPES = 'GET_FUEL_TYPES';

export const getFuelTypes = ({ data, success, failure }) => {
    return {
        type: GET_FUEL_TYPES,
        data,
        success,
        failure
    }
};

export const getVehicleTypes = ({ data, success, failure }) => {
    return {
        type: GET_VEHICLE_TYPES,
        data,
        success,
        failure
    }
};

export const getTransmissionTypes = ({ data, success, failure }) => {
    return {
        type: GET_TRANSMISSION_TYPES,
        data,
        success,
        failure
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
}