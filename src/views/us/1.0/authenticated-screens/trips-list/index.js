/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    fetchPastTrips,
    fetchUpcomingTrips,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        upcomingTrips: state.TripsReducer.upcomingTrips,
        pastTrips: state.TripsReducer.pastTrips,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchUpcomingTrips: (data, success, failure) => dispatch(fetchUpcomingTrips(data, success, failure)),
        fetchPastTrips: (data, success, failure) => dispatch(fetchPastTrips(data, success, failure)),
    };
};
export const TripListScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
