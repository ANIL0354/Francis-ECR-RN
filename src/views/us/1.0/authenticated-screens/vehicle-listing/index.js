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
    setDropoffLocation,
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
        dropOffLocation: state.CommonReducer.dropOffLocation,
        transmissionType: state.CommonReducer.transmissionType,
        fuelType: state.CommonReducer.fuelType,
        userToken: state.CommonReducer.userToken,
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
        setDropoffLocation: value => dispatch(setDropoffLocation(value)),
        setPickupDate: value => dispatch(setPickupDate(value)),
        setTransmissionType: value => dispatch(setTransmissionType(value)),
        setSeatsValue: value => dispatch(setSeatsValue(value)),
        setVehicleType: value => dispatch(setVehicleType(value)),
        fetchVehicleListing: (data, success, failure) => dispatch(fetchVehicleListing(data, success, failure))
    }
}
export const VehicleListing = connect(mapStateToProps, mapDispatchToProps)(Screen);