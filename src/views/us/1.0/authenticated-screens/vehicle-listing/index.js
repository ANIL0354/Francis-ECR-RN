import { connect } from 'react-redux';
import { Screen } from "./screen";
import {
    logout,
    setTransmissionType,
    setFreeDays,
    setFuelType,
    setVehicleType,
    setSeatsValue,
    startLoader,
    stopLoader,
    setGpsEnabled,
    setLocationEnabled,
    setNeverAskPermission,
    setPickupLocation,
    updateInternetStatus
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        seatsValue: state.CommonReducer.seatsValue,
        freeDays: state.CommonReducer.freeDays,
        vehicleType: state.CommonReducer.vehicleType,
        transmissionType: state.CommonReducer.transmissionType,
        fuelType: state.CommonReducer.fuelType,
        userToken: state.CommonReducer.userToken,
        gpsEnabled: state.CommonReducer.gpsEnabled,
        locationEnabled: state.CommonReducer.locationEnabled,
        neverAskPermission: state.CommonReducer.neverAskPermission,
        isNetConnected: state.CommonReducer.isNetConnected,
        pickupLocation: state.CommonReducer.pickupLocation,
        pickupDate: state.CommonReducer.pickupDate,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        setFuelType: value => dispatch(setFuelType(value)),
        setFreeDays: value => dispatch(setFreeDays(value)),
        setPickupLocation: value => dispatch(setPickupLocation(value)),
        setPickupDate: value => dispatch(setPickupDate(value)),
        setTransmissionType: value => dispatch(setTransmissionType(value)),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        logout: (token, success, failure) => dispatch(logout(token, success, failure)),
        setGpsEnabled: status => dispatch(setGpsEnabled(status)),
        updateInternetStatus: status => dispatch(updateInternetStatus(status)),
        setLocationEnabled: status => dispatch(setLocationEnabled(status)),
        setNeverAskPermission: status => dispatch(setNeverAskPermission(status)),
    }
}
export const VehicleListing = connect(mapStateToProps, mapDispatchToProps)(Screen);