import { SET_ALERT, REMOVE_ALERT } from "../actions/types"

const initialState = []

export default function (state = initialState, action) {
  const { type, payload } = action
  //  console.log("alert auth called")
  // console.log(payload)
  switch (type) {
    case SET_ALERT:
      return [...state, payload]

    case REMOVE_ALERT:
      return state.filter((data) => data.id !== payload)

    default:
      return state
  }
}
