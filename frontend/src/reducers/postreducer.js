import {
  POSTS_FAILURE,
  POSTS_REQUEST,
  POSTS_SUCCESS,
  DELETE_POST,
} from "../actions/action_types"
const initialState = {
  loading: false,
  posts: [],
  error: ''
}
const postreducer = (state = initialState, action) => {
  let posts = state.posts

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

    case DELETE_POST:
      return posts.filter((id) => id !== action.id)

    default: return state
  }
}
export default postreducer;