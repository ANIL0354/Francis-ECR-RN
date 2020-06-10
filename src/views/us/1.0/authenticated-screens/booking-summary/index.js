/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    fetchProfile,
    submitBookingRequest,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        profileData: state.CommonReducer.profileData,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchProfile: (success, failure) => dispatch(fetchProfile(success, failure)),
        submitBookingRequest: (driverId, data, success, failure) => dispatch(submitBookingRequest(driverId, data, success, failure)),
    };
};
export const BookingSummary = connect(mapStateToProps, mapDispatchToProps)(Screen);
