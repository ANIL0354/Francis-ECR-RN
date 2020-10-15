/* eslint-disable prettier/prettier */
import {
    SAVE_UPCOMING_TRIP_LIST,
    SAVE_CANCELLED_TRIP_LIST,
    SAVE_PAST_TRIP_LIST,
    APPEND_UPCOMING_TRIP_LIST,
    APPEND_PAST_TRIP_LIST,
    APPEND_CANCELLED_TRIP_LIST,
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
        case APPEND_UPCOMING_TRIP_LIST:
            return {
                ...state,
                upcomgingTrips: {
                    totalCount: action.data.totalCount,
                    trips: [...state.upcomingTrips.trips, ...action.data.trips],
                },
            };
        case SAVE_PAST_TRIP_LIST:
            return {
                ...state,
                pastTrips: action.data,
            };
        case APPEND_PAST_TRIP_LIST:
            return {
                ...state,
                pastTrips: {
                    totalCount: action.data.totalCount,
                    trips: [...state.pastTrips.trips, ...action.data.trips],
                },
            };
        case SAVE_CANCELLED_TRIP_LIST:
            return {
                ...state,
                cancelledTrips: action.data,
            };
        case APPEND_CANCELLED_TRIP_LIST:
            return {
                ...state,
                cancelledTrips: {
                    totalCount: action.data.totalCount,
                    trips: [...state.cancelledTrips.trips, ...action.data.trips],
                },
            };
        default:
            return state;
    }
};

export default TripsReducer;
