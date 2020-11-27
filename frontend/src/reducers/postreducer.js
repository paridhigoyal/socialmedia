/**postreducer consists of POSTS_FAILURE, POSTS_REQUEST, POSTS_SUCCESS, 
 * DELETE_POST, EDIT_POST,EDIT_POST_FAIL,UPDATE_LIKE, DELETE_LIKE,SET_LIKE, */
import {
  POSTS_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  DELETE_POST,
  EDIT_POST,
  EDIT_POST_FAIL,
  UPDATE_LIKE,
  DELETE_LIKE,
  SET_LIKE,
} from "../actions/action_types"

const initialState = {
  loading: false,
  posts: [],
  error: ''
}
const postreducer = (state = initialState, action) => {
  let posts = state.posts;
  let postIndex;

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
    case EDIT_POST_FAIL:
      return {
        loading: false,
        posts: [],
        error: action.payload
      }

    case DELETE_POST:
      posts.filter((id) => id !== action.id)
      return {
        ...state,
        posts: action.payload
      }
    case SET_LIKE:
      postIndex = state.posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex !== -1) {
        state.posts.splice(postIndex, 1, action.payload)
      }
      return {
        ...state,
        posts
      }

    case UPDATE_LIKE:
      postIndex = state.posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex !== -1) {
        state.posts.splice(postIndex, 1, action.payload)
      }
      return {
        ...state,
        posts
      }
    case DELETE_LIKE:
      postIndex = state.posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex !== -1) {
        state.posts.splice(postIndex, 1, action.payload)
      }
      return {
        ...state,
        posts
      }


    case EDIT_POST:
      postIndex = posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex > -1) {
        posts.splice(postIndex, 1, action.payload)
      }
      return {
        ...state,
        posts
      }

    default: return state
  }
}
export default postreducer;