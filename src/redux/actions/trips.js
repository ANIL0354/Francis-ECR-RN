/* eslint-disable prettier/prettier */
export const FETCH_UPCOMING_TRIPS = 'FETCH_UPCOMING_TRIPS';
export const SAVE_UPCOMING_TRIP_LIST = 'SAVE_UPCOMING_TRIP_LIST';
export const FETCH_PAST_TRIPS = 'FETCH_PAST_TRIPS';
export const SAVE_PAST_TRIP_LIST = 'SAVE_PAST_TRIP_LIST';

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

export const saveUpcomingTripList = data => {
    return {
        type: SAVE_UPCOMING_TRIP_LIST,
        data,
    };
};

export const savePastTripList = data => {
    return {
        type: SAVE_PAST_TRIP_LIST,
        data,
    };
};
