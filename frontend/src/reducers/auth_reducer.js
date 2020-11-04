import {
  LOGIN, LOGOUT
}
  //  GET_USER, USER_LOADING, UPDATE_USER_INFO,
  // GET_USER_ERROR, LOGOUT, REGISTER, UPDATE_IMAGE}
  from "../actions/action_types"
const init = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false,
}

export default function (state = init, action) {
  switch (action.type) {
    case LOGIN:
      // console.log(localStorage.getItem("token"))
      // case REGISTER:
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: true,
        user: action.payload.user,
      }
    case LOGOUT:
      localStorage.setItem("token", null)
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }
    default:
      return state
  }
}