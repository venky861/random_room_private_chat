import {
  LOAD_CURRENTUSER,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  PROFILE_EDIT,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  // console.log(payload)
  switch (type) {
    case LOAD_CURRENTUSER:
    case PROFILE_EDIT:
      return {
        ...state,
        loading: false,
        user: payload,
        isAuthenticated: true,
      }

    case AUTH_ERROR:
    case LOGOUT:
    case CLEAR_PROFILE:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }

    default:
      return state
  }
}
