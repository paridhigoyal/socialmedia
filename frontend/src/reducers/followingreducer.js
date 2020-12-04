import {
    FOLLOWING_FAILURE,
    FOLLOWING_REQUEST,
    FOLLOWING_SUCCESS,
  
  } from "../actions/action_types"
  const initialState = {
    loading: false,
    followings: [],
    error: ''
  }
  const followingreducer= (state = initialState, action) => {
  console.log(action.type)
    switch (action.type) {
      case FOLLOWING_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FOLLOWING_SUCCESS:
        return {
          loading: false,
          followings: action.payload,
          error: ''
        }
      case FOLLOWING_FAILURE:
        return {
          loading: false,
          followings: [],
          error: action.payload
        }
  
      default: return state
    }
  }
  export default followingreducer;