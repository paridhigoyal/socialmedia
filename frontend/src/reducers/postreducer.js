import {
  POSTS_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  DELETE_POST,
  EDIT_POST,
  EDIT_POST_FAIL,
  MAKE_LIKE,
  UPDATE_LIKE,
  DELETE_LIKE,
} from "../actions/action_types"
const initialState = {
  loading: false,
  posts: [],
  error: ''
}
const postreducer = (state = initialState, action) => {
  let posts = state.posts;
  // let post;
  let postIndex;

  // console.log(action.type)
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
      return posts.filter((id) => id !== action.id)

    case MAKE_LIKE:
    case UPDATE_LIKE:
    case DELETE_LIKE:
      postIndex = posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex !== -1) {
        posts.splice(postIndex, 1, action.payload)
      }
      return {
        posts
      }

    case EDIT_POST:
      postIndex = posts.findIndex((post) => (post.id === action.payload.id))
      if (postIndex > -1) {
        posts.splice(postIndex, 1, action.payload)
      }
      return posts

    default: return state
  }
}
export default postreducer;