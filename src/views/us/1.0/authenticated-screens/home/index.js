import { connect } from 'react-redux';
import { Screen } from "./screen";
import {
    logout,
    setGpsEnabled,
    setLocationEnabled,
    setNeverAskPermission,
    updateInternetStatus,
    getPopularPlaces,
    setTransmissionType,
    setFreeDays,
    setFuelType,
    setVehicleType,
    setSeatsValue,
    startLoader,
    stopLoader,
    setPickupLocation,
    setPickupDate,
    fetchVehicleListing
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
        pickupLocation: state.CommonReducer.pickupLocation,
        pickupDate: state.CommonReducer.pickupDate,
        locationEnabled: state.CommonReducer.locationEnabled,
        neverAskPermission: state.CommonReducer.neverAskPermission,
        isNetConnected: state.CommonReducer.isNetConnected,
        popularPlaces: state.ListsReducer.popularPlaces
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        setPickupLocation: value => dispatch(setPickupLocation(value)),
        setPickupDate: value => dispatch(setPickupDate(value)),
        setFuelType: value => dispatch(setFuelType(value)),
        setFreeDays: value => dispatch(setFreeDays(value)),
        setTransmissionType: value => dispatch(setTransmissionType(value)),
        setVehicleType: value => dispatch(setVehicleType(value)),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        logout: (token, success, failure) => dispatch(logout(token, success, failure)),
        setGpsEnabled: status => dispatch(setGpsEnabled(status)),
        updateInternetStatus: status => dispatch(updateInternetStatus(status)),
        setLocationEnabled: status => dispatch(setLocationEnabled(status)),
        setNeverAskPermission: status => dispatch(setNeverAskPermission(status)),
        getPopularPlaces: (data, success, failure) => dispatch(getPopularPlaces(data, success, failure)),
        fetchVehicleListing: (data, success, failure) => dispatch(fetchVehicleListing(data, success, failure))
    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);