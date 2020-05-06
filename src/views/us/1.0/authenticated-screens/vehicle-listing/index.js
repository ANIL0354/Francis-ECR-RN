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
    setPickupDate,
    stopLoader,
    setAdultSeats,
    setChildSeats,
    setGpsEnabled,
    setLocationEnabled,
    setNeverAskPermission,
    setPickupLocation,
    updateInternetStatus,
    fetchVehicleListing,
    getTransmissionTypes,
    getVehicleTypes,
    refreshVehicleList
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        vehicleListing: state.ListsReducer.vehicleListing,
        vehicleListItems: state.ListsReducer.vehicleListItems,
        childSeatsValue: state.CommonReducer.childSeatsValue,
        adultSeatsValue: state.CommonReducer.adultSeatsValue,
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
        fuelTypesList: state.ListsReducer.fuelTypesList,
        vehicleTypesList: state.ListsReducer.vehicleTypesList,
        transmissionTypesList: state.ListsReducer.transmissionTypesList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        setChildSeats: value => dispatch(setChildSeats(value)),
        setAdultSeats: value => dispatch(setAdultSeats(value)),
        setFuelType: value => dispatch(setFuelType(value)),
        refreshVehicleList: () => dispatch(refreshVehicleList()),
        getVehicleTypes: (data, success, failure) => dispatch(getVehicleTypes(data, success, failure)),
        getTransmissionTypes: (data, success, failure) => dispatch(getTransmissionTypes(data, success, failure)),
        setFreeDays: value => dispatch(setFreeDays(value)),
        setPickupLocation: value => dispatch(setPickupLocation(value)),
        setPickupDate: value => dispatch(setPickupDate(value)),
        setTransmissionType: value => dispatch(setTransmissionType(value)),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        logout: (token, success, failure) => dispatch(logout(token, success, failure)),
        setGpsEnabled: status => dispatch(setGpsEnabled(status)),
        setVehicleType: value => dispatch(setVehicleType(value)),
        updateInternetStatus: status => dispatch(updateInternetStatus(status)),
        setLocationEnabled: status => dispatch(setLocationEnabled(status)),
        setNeverAskPermission: status => dispatch(setNeverAskPermission(status)),
        fetchVehicleListing: (data, success, failure) => dispatch(fetchVehicleListing(data, success, failure))
    }
}
export const VehicleListing = connect(mapStateToProps, mapDispatchToProps)(Screen);