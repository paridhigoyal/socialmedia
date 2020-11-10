import {
  LOGIN, LOGOUT
}
  from "../actions/action_types"
const init = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false,
}

export default function authReduer (state = init, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user" , action.payload.user);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.token ? true : false,
        user: action.payload.user,
      }
    case LOGOUT:
      localStorage.setItem("user", null);
      localStorage.removeItem("token");
      return {};

    default:
      return state
  }
}