/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    emailAgency,
    cancelTrip,
    fetchCompleteDetails,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        completeDetails: state.ListsReducer.completeDetails,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        emailAgency: (data, success, failure) => dispatch(emailAgency(data, success, failure)),
        cancelTrip: (listingId, data, success, failure) => dispatch(cancelTrip(listingId, data, success, failure)),
        fetchCompleteDetails: (id, success, failure) => dispatch(fetchCompleteDetails(id, success, failure)),
    };
};
export const TripDetailScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
