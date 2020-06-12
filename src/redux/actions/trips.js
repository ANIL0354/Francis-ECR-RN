/* eslint-disable prettier/prettier */
export const FETCH_UPCOMING_TRIPS = 'FETCH_UPCOMING_TRIPS';
export const SAVE_UPCOMING_TRIP_LIST = 'SAVE_UPCOMING_TRIP_LIST';
export const FETCH_PAST_TRIPS = 'FETCH_PAST_TRIPS';
export const FETCH_CANCELLED_TRIPS = 'FETCH_CANCELLED_TRIPS';
export const SAVE_PAST_TRIP_LIST = 'SAVE_PAST_TRIP_LIST';
export const EMAIL_AGENCY = 'EMAIL_AGENCY';
export const CANCEL_TRIP = 'CANCEL_TRIP';
export const SAVE_CANCELLED_TRIP_LIST = 'SAVE_CANCELLED_TRIP_LIST';
export const APPEND_UPCOMING_TRIP_LIST = 'APPEND_UPCOMING_TRIP_LIST';
export const APPEND_PAST_TRIP_LIST = 'APPEND_PAST_TRIP_LIST';
export const APPEND_CANCELLED_TRIP_LIST = 'APPEND_CANCELLED_TRIP_LIST';

export const fetchUpcomingTrips = (data, success, failure) => {
    return {
        type: FETCH_UPCOMING_TRIPS,
        data,
        success,
        failure,
    };
};

export const fetchPastTrips = (data, success, failure) => {
    return {
        type: FETCH_PAST_TRIPS,
        data,
        success,
        failure,
    };
};

export const fetchCancelledTrips = (data, success, failure) => {
    return {
        type: FETCH_CANCELLED_TRIPS,
        data,
        success,
        failure,
    };
};

export const saveUpcomingTripList = data => {
    return {
        type: SAVE_UPCOMING_TRIP_LIST,
        data,
    };
};

export const appendUpcomingTripList = data => {
    return {
        type: APPEND_UPCOMING_TRIP_LIST,
        data,
    };
};

export const savePastTripList = data => {
    return {
        type: SAVE_PAST_TRIP_LIST,
        data,
    };
};

export const appendPastTripList = data => {
    return {
        type: APPEND_PAST_TRIP_LIST,
        data,
    };
};

export const saveCancelledTripList = data => {
    return {
        type: SAVE_CANCELLED_TRIP_LIST,
        data,
    };
};

export const appendCancelledTripList = data => {
    return {
        type: APPEND_CANCELLED_TRIP_LIST,
        data,
    };
};

export const emailAgency = (data, success, failure) => {
    return {
        type: EMAIL_AGENCY,
        data,
        success,
        failure,
    };
};

export const cancelTrip = (listingId, data, success, failure) => {
    return {
        type: CANCEL_TRIP,
        listingId,
        data,
        success,
        failure,
    };
};
