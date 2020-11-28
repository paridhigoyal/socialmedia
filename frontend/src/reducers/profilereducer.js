/**profilereducer consists of  PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS, */

import {
  PROFILE_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  USER_INFO_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS

} from "../actions/action_types"

const initialState = {
  loading: false,
  profiles: [],
  user:[],
  error: ''
}

const profilereducer = (state = initialState, action) => {
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
      case USER_INFO_REQUEST:
        return {
          ...state,
          loading: true
        }
      case USER_INFO_SUCCESS:
        return {
          loading: false,
          profiles: action.payload,
          error: ''
        }
      case USER_INFO_FAILURE:
        return {
          loading: false,
          profiles: [],
          error: action.payload
        }


    default: return state
  }
}

export default profilereducer;