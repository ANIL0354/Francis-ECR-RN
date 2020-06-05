import { combineReducers } from "redux";
import CommonReducer from './common';
import ListsReducer from './listing';
import TripsReducer from './trips';
import RatingsReducer from './ratings';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    CommonReducer,
    form: formReducer,
    ListsReducer,
    TripsReducer,
    RatingsReducer,
});

export default rootReducer;
