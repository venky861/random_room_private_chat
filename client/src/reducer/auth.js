import {
  SEND_SMS,
  AUTH_ERROR,
  GOOGLE_LOGIN,
  REGISTER,
  LOGIN,
  TOKEN_AUTH,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
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
      }
    case REGISTER:
    case GOOGLE_LOGIN:
    case LOGIN:
      localStorage.setItem("token", payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case TOKEN_AUTH:
      localStorage.setItem("token", payload)
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case AUTH_ERROR:
      return { ...state, ...payload, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
