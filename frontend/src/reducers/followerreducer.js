import {
  FOLLOWER_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,

} from "../actions/action_types"
const initialState = {
  loading: false,
  followers: [],
  error: ''
}
const followerreducer = (state = initialState, action) => {
  //let followers = state.followers

  // console.log(action.type)
  switch (action.type) {
    case FOLLOWER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FOLLOWER_SUCCESS:
      return {
        loading: false,
        followers: action.payload,
        error: ''
      }
    case FOLLOWER_FAILURE:
      return {
        loading: false,
        followers: [],
        error: action.payload
      }


    default: return state
  }
}
export default followerreducer;