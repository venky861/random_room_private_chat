import { SEND_SMS, AUTH_ERROR, GOOGLE_LOGIN } from "./types"
import axios from "axios"

export const sendsms = ({ num, textmessage }) => async (dispatch) => {
  console.log("action called")
  try {
    const body = JSON.stringify({ num, textmessage })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post("/sms", body, config)

    dispatch({
      type: SEND_SMS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const auth = () => async (dispatch) => {
  console.log("google called")
  try {
    await axios.get("/auth/google")
    dispatch({
      type: GOOGLE_LOGIN,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}
