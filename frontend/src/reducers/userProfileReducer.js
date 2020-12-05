import {
    USER_PROFILE_FAILURE,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
  
  } from "../actions/action_types"
  
  const initialState = {
    loading: false,
    profile: [],
    
    error: ''
  }
  
const userProfileReducer= (state = initialState, action) => {
    switch (action.type) {
      case USER_PROFILE_REQUEST:
        return {
          ...state,
          loading: true
        }
      case USER_PROFILE_SUCCESS:
        return {
          loading: false,
          profile: action.payload,
          error: ''
        }
      case USER_PROFILE_FAILURE:
        return {
          loading: false,
          profile: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default userProfileReducer;