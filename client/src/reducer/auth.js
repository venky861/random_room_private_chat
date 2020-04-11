import { SEND_SMS, AUTH_ERROR, GOOGLE_LOGIN } from "../actions/types"

const initialState = {
  loading: false,
  text: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(payload)
  switch (type) {
    case SEND_SMS:
      return {
        ...state,
        loading: true,
        text: payload,
      }

    case GOOGLE_LOGIN:
      return { ...state }

    case AUTH_ERROR:
      return { ...state }
    default:
      return state
  }
}
