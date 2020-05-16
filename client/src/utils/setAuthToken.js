import axios from "axios"

const setAuthToken = (token) => {
  console.log("set auth token called outside")
  if (token) {
    console.log("set auth token called inside")
    console.log(token)
    axios.defaults.headers.common["x-auth-token"] = token
  } else {
    delete axios.defaults.headers.commom["x-auth-token"]
  }
}

export default setAuthToken
