import {
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,

} from "../actions/action_types"
const initialState = {
  loading: false,
  profiles: [],
  error: ''
}
const profilereducer = (state = initialState, action) => {
  // let profiles = state.profiles

  // console.log(action.type)
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PROFILE_SUCCESS:
      return {
        loading: false,
        profiles: action.payload,
        error: ''
      }
    case PROFILE_FAILURE:
      return {
        loading: false,
        profiles: [],
        error: action.payload
      }


    default: return state
  }
}
export default profilereducer;