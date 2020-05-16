import {
  SEND_SMS,
  AUTH_ERROR,
  GOOGLE_LOGIN,
  REGISTER,
  LOGIN,
  TOKEN_AUTH,
  LOGOUT,
  CLEAR_PROFILE,
  LOAD_ALLUSER,
  PRIVATEMESSAGES,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  users: [],
  messages: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case SEND_SMS:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      }
    case LOAD_ALLUSER:
      return {
        ...state,
        loading: false,
        users: payload,
        isAuthenticated: true,
      }
    case PRIVATEMESSAGES:
      return {
        ...state,
        loading: false,
        messages: payload,
      }
    case REGISTER:
    case GOOGLE_LOGIN:
    case LOGIN:
    case TOKEN_AUTH:
      console.log(payload.token)
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: payload.token,
      }

    case AUTH_ERROR:
    case LOGOUT:
    case CLEAR_PROFILE:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
