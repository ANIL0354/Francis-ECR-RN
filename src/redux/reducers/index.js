import { combineReducers } from "redux";
import CommonReducer from './common';
import ListsReducer from './listing';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    CommonReducer,
    form: formReducer,
    ListsReducer
});

export default rootReducer;
