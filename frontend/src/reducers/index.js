import { combineReducers } from "redux"
import authReducer from "./auth_reducer"
import { reducer as formReducer } from "redux-form";
import postreducer from "./postreducer";
import profilereducer from './profilereducer'
import followerreducer from './followerreducer'
import commentReducer from './commentReducer'
import userInfoReducer from './userInfoReducer'
export default combineReducers({
  authReducer,
  form: formReducer,
  postreducer,
  profilereducer,
  followerreducer,
  commentReducer,
  userInfoReducer
})