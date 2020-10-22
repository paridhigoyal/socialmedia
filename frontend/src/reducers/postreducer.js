import {
    POSTS_FAILURE,
    POSTS_REQUEST,
    POSTS_SUCCESS,
    } from "../actions/action_types"
    const initialState = {
        loading: false,
        posts: [],
        error: ''
      }
  const postreducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
      case POSTS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case POSTS_SUCCESS:
        return {
          loading: false,
          posts: action.payload,
          error: ''
        }
      case POSTS_FAILURE:
        return {
          loading: false,
          posts: [],
          error: action.payload
        }
        default: return state
    }
  }
  export default postreducer;