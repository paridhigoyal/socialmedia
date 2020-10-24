import { combineReducers } from "redux"
import authReducer from "./auth_reducer"
import { reducer as formReducer } from "redux-form";
import postreducer from "./postreducer"
export default combineReducers({
    authReducer,
    form: formReducer,
    postreducer
})