/* eslint-disable prettier/prettier */
import {
    SAVE_RATING_LIST,
} from '../actions';

const initialCommonState = {
    ratingList: null,
};

const RatingsReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_RATING_LIST:
            return {
                ...state,
                ratingList: action.data,
            };
        default:
            return state;
    }
};

export default RatingsReducer;
