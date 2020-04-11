import {
  SEND_SMS,
  AUTH_ERROR,
  GOOGLE_LOGIN,
  REGISTER,
  LOGIN,
} from "../actions/types"

const initialState = {
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
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case AUTH_ERROR:
      return { ...state, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
