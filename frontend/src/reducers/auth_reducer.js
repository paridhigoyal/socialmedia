/**auth_reducer is for LOGIN, LOGOUT action types i.e.  for authentication credentials */

import {
  LOGIN,
  LOGOUT
}
  from "../actions/action_types"
const init = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false,
}

export default function authReducer(state = init, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        error: null,
        isAuthenticated: action.payload.token ? true : false,
        user: action.payload.user,
      }
    case LOGOUT:

      return {
        isLoading: false,
        token: null,
        error: null,
      };

    default:
      return state
  }
}