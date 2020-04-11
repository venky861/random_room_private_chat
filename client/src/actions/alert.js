import { SET_ALERT, REMOVE_ALERT } from "./types"
import uuid from "uuid"

export const setAlert = (msg) => async (dispatch) => {
  const id = uuid.v4()
  console.log("alert action called")
  dispatch({
    type: SET_ALERT,
    payload: { msg, id },
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000)
}
