import {
     FAV_POSTS_REQUEST,
     FAV_POSTS_SUCCESS,
     FAV_POSTS_FAILURE,
  
  
  
  } from "../actions/action_types"
  
  const initialState = {
    loading: false,
    post: [],
    error: ''
  }
  const postDetailReducer = (state = initialState, action) => {
  
    switch (action.type) {
  
      case  FAV_POSTS_REQUEST:
        return {
          ...state,
          loading: true
        }
  
      case  FAV_POSTS_SUCCESS:
        return {
          loading: false,
          post: action.payload,
          error: ''
        }
  
      case  FAV_POSTS_FAILURE:
        return {
          loading: false,
          post: [],
          error: action.payload
        }
  
      default: return state
    }
  }
  
  export default postDetailReducer;