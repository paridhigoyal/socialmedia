import { combineReducers } from "redux"
import authReducer from "./auth_reducer"
import { reducer as formReducer } from "redux-form";
import postreducer from "./postreducer";
import profilereducer from './profilereducer'
import followerreducer from './followerreducer'
export default combineReducers({
  authReducer,
  form: formReducer,
  postreducer,
  profilereducer,
  followerreducer,
})