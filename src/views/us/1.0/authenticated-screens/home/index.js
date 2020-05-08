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
    setChildSeats,
    setAdultSeats,
    startLoader,
    stopLoader,
    setPickupLocation,
    setPickupDate,
    fetchVehicleListing,
    getFuelTypes,
    getTransmissionTypes,
    setDropoffLocation,
    getVehicleTypes
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        childSeatsValue: state.CommonReducer.childSeatsValue,
        adultSeatsValue: state.CommonReducer.adultSeatsValue,
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
        popularPlaces: state.ListsReducer.popularPlaces,
        fuelTypesList: state.ListsReducer.fuelTypesList,
        vehicleTypesList: state.ListsReducer.vehicleTypesList,
        transmissionTypesList: state.ListsReducer.transmissionTypesList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getFuelTypes: (data, success, failure) => dispatch(getFuelTypes(data, success, failure)),
        getVehicleTypes: (data, success, failure) => dispatch(getVehicleTypes(data, success, failure)),
        getTransmissionTypes: (data, success, failure) => dispatch(getTransmissionTypes(data, success, failure)),
        setChildSeats: value => dispatch(setChildSeats(value)),
        setAdultSeats: value => dispatch(setAdultSeats(value)),
        setPickupLocation: value => dispatch(setPickupLocation(value)),
        setDropoffLocation: value => dispatch(setDropoffLocation(value)),
        setPickupDate: value => dispatch(setPickupDate(value)),
        setFuelType: value => dispatch(setFuelType(value)),
        setFreeDays: value => dispatch(setFreeDays(value)),
        setTransmissionType: value => dispatch(setTransmissionType(value)),
        setVehicleType: value => dispatch(setVehicleType(value)),
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