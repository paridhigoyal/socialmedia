import {
    USER_FAV_REQUEST,
    USER_FAV_SUCCESS,
    USER_FAV_FAILURE
  
  
  } from "../actions/action_types"
  
  const initialState = {
    loading: false,
    favposts: [],
    error: ''
  }
  const userFavPostReducer = (state = initialState, action) => {
  
    switch (action.type) {
  
      case USER_FAV_REQUEST:
        return {
          ...state,
          loading: true
        }
  
      case USER_FAV_SUCCESS:
        return {
          loading: false,
          favposts: action.payload,
          error: ''
        }
  
      case USER_FAV_FAILURE:
        return {
          loading: false,
          favposts: [],
          error: action.payload
        }
  
      default: return state
    }
  }
  
  export default userFavPostReducer;