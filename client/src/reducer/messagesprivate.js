import { AUTH_ERROR, PRIVATEMESSAGES } from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  messages: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case PRIVATEMESSAGES:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        messages: payload,
      }

    case AUTH_ERROR:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
