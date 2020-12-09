/**userInfoReducer consists of  USER_INFO_FAILURE, USER_INFO_REQUEST, USER_INFO_SUCCESS */

import {
  USER_INFO_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS

} from "../actions/action_types"

const initialState = {
  loading: false,
  user: [],
  error: ''
}

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_INFO_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: ''
      }
    case USER_INFO_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload
      }

    default: return state
  }
}

export default userInfoReducer;