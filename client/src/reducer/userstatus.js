import { AUTH_ERROR, USERSTATUS, TYPING } from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  status: null,
  typing: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case USERSTATUS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        status: payload,
      }

    case TYPING:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        typing: payload,
      }
    case AUTH_ERROR:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, loading: false }
    default:
      return state
  }
}
