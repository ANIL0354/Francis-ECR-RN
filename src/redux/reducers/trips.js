/* eslint-disable prettier/prettier */
import {
    SAVE_UPCOMING_TRIP_LIST,
    SAVE_CANCELLED_TRIP_LIST,
    SAVE_PAST_TRIP_LIST,
} from '../actions';

const initialCommonState = {
    upcomingTrips: null,
    pastTrips: null,
    cancelledTrips: null,
};

const TripsReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_UPCOMING_TRIP_LIST:
            return {
                ...state,
                upcomingTrips: action.data,
            };
        case SAVE_PAST_TRIP_LIST:
            return {
                ...state,
                pastTrips: action.data,
            };
        case SAVE_CANCELLED_TRIP_LIST:
            return {
                ...state,
                cancelledTrips: action.data,
            };
        default:
            return state;
    }
};

export default TripsReducer;
