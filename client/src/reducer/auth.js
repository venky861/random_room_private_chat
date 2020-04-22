import {
  SEND_SMS,
  AUTH_ERROR,
  GOOGLE_LOGIN,
  REGISTER,
  LOGIN,
  TOKEN_AUTH,
  LOGOUT,
  CLEAR_PROFILE,
  LOAD_CURRENTUSER,
  LOAD_ALLUSER,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case SEND_SMS:
    case LOAD_CURRENTUSER:
    case LOAD_ALLUSER:
      return {
        ...state,
        loading: false,
        user: payload,
      }
    case REGISTER:
    case GOOGLE_LOGIN:
    case LOGIN:
    case TOKEN_AUTH:
      localStorage.setItem("token", payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case AUTH_ERROR:
    case LOGOUT:
    case CLEAR_PROFILE:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
