import {
    SAVE_POPULAR_PLACES,
    SAVE_VEHICLE_LISTING,
    SAVE_FUEL_TYPES,
    SAVE_TRANSMISSION_TYPES,
    SAVE_VEHICLE_TYPES
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../config/default`);

const initialCommonState = {
    popularPlaces: null,
    vehicleListing: null,
    vehicleListItems: [],
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
            console.log('action.data', action.data)
            return {
                ...state,
                vehicleListing: action.data,
                vehicleListItems: [...state.vehicleListItems, ...action.data[0].items]
            }
        case SAVE_FUEL_TYPES:
            return {
                ...state,
                fuelTypesList: action.data
            }
        case SAVE_TRANSMISSION_TYPES:
            return {
                ...state,
                transmissionTypesList: action.data
            }
        case SAVE_VEHICLE_TYPES:
            return {
                ...state,
                vehicleTypesList: action.data
            }
        default:
            return state;
    }
};

export default ListsReducer;