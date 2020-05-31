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
  LOAD_CURRENTUSER,
  PROFILE_EDIT,
  PRIVATEMESSAGES,
  USERSTATUS,
  TYPING,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const sendsms = ({ num, textmessage }) => async (dispatch) => {
  // console.log("action called")
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
  try {
    //   console.log("google called")
    await axios.get("/auth/google")
    const res = await axios.get("/token")
    console.log("token", res)
    dispatch({
      type: GOOGLE_LOGIN,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const register = ({
  name,
  email,
  password,
  age,
  gender,
  country,
}) => async (dispatch) => {
  try {
    // console.log("register called")
    const body = JSON.stringify({ name, email, password, age, gender, country })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post("/register", body, config)
    dispatch({
      type: REGISTER,
      payload: res.data,
    })
  } catch (err) {
    console.log(" register error called")
    const errors = err.response.data.errors
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)))
    }

    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const login = ({ email, password }) => async (dispatch) => {
  try {
    //   console.log("login called")
    const body = JSON.stringify({ email, password })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post("/login", body, config)
    console.log(res.data)
    dispatch({
      type: LOGIN,
      payload: res.data,
    })
  } catch (err) {
    console.log("login error called")

    const errors = err.response.data.errors
    console.log(errors)
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)))
    }
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const logout = () => async (dispatch) => {
  console.log("logout called")
  try {
    await axios.get("/api/logout")
    dispatch({
      type: LOGOUT,
    })
  } catch (err) {
    dispatch({
      type: CLEAR_PROFILE,
    })
  }
}

export const loadalluser = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/all_user")
    dispatch({
      type: LOAD_ALLUSER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const loadcurrentuser = () => async (dispatch) => {
  console.log("current user called")
  try {
    const res = await axios.get("/auth/current_user")
    console.log("token", res)
    dispatch({
      type: LOAD_CURRENTUSER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const token = () => async (dispatch) => {
  try {
    const res = await axios.get("/token")
    console.log("token", res)
    dispatch({
      type: TOKEN_AUTH,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const profileedit = (editProfileData, history) => async (dispatch) => {
  console.log("profileledit called")
  try {
    const body = JSON.stringify(editProfileData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post("/api/updateuser/", body, config)
    dispatch({
      type: PROFILE_EDIT,
      payload: res.data,
    })
    history.push("/messages")
  } catch (err) {
    console.log(err)
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const privatemsg = () => async (dispatch) => {
  // console.log("current user called")
  try {
    const res = await axios.get("/api/privatemsg")
    console.log("private msg ", res.data)
    dispatch({
      type: PRIVATEMESSAGES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const dbUserStatus = (id) => async (dispatch) => {
  // console.log("current user called")
  // console.log(id)
  try {
    const res = await axios.get(`/api/dbuserstatus/${id}`)
    //   console.log("db status ", res.data)
    //   console.log("dbUserStatus called")
    dispatch({
      type: USERSTATUS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const typingMessage = (id) => async (dispatch) => {
  try {
    console.log("called typing")
    const res = await axios.get(`/api/typing/${id}`)
    console.log(res)
    dispatch({
      type: TYPING,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}
