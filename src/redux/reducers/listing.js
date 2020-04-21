import {
    SAVE_POPULAR_PLACES
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../config/default`);

const initialCommonState = {
    popularPlaces: null
};

const ListsReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_POPULAR_PLACES:
            return {
                ...state,
                popularPlaces: action.data
            }
        default:
            return state;
    }
};

export default ListsReducer;