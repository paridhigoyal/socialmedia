import {
    USER_POSTS_FAILURE,
    USER_POSTS_REQUEST,
    USER_POSTS_SUCCESS,

  
  } from "../actions/action_types"
  
  const initialState = {
    loading: false,
    posts: [],
    error: ''
  }
  const userpostReducer = (state = initialState, action) => {
   
  
    switch (action.type) {
      
        case USER_POSTS_REQUEST:
        return {
          ...state,
          loading: true
        }
      
        case USER_POSTS_SUCCESS:
        return {
          loading: false,
          posts: action.payload,
          error: ''
        }
      
        case USER_POSTS_FAILURE:
        return {
          loading: false,
          posts: [],
          error: action.payload
        }  
      
        default: return state
    }
  }

export default userpostReducer;