/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from "./screen";
import {
    startLoader,
    stopLoader,
    submitBookingRequest
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        driverData: state.CommonReducer.driverData
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        submitBookingRequest: (driverId, data, success, failure) => dispatch(submitBookingRequest(driverId, data, success, failure))
    }
}
export const BookingSummary = connect(mapStateToProps, mapDispatchToProps)(Screen);