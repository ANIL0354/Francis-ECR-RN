import {
    SAVE_POPULAR_PLACES,
    SAVE_VEHICLE_LISTING,
    SAVE_FUEL_TYPES
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../config/default`);

const initialCommonState = {
    popularPlaces: null,
    vehicleListing: null,
    fuelTypesList: null,
    vehicleTypesList: null,
    transmissionTypesList: null
};

const ListsReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_POPULAR_PLACES:
            return {
                ...state,
                popularPlaces: action.data
            }
        case SAVE_VEHICLE_LISTING:
            return {
                ...state,
                vehicleListing: action.data
            }
        case SAVE_FUEL_TYPES:
            return {
                ...state,
                fuelTypesList: action.data
            }
        default:
            return state;
    }
};

export default ListsReducer;