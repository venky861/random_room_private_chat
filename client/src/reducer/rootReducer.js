import { combineReducers } from "redux"
import auth from "./auth"
import alert from "./alert"
import currentUser from "./currentUser"
import userstatus from "./userstatus"
import messagesprivate from "./messagesprivate"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "alert", "currentUser", "messagesprivate"],
}

const rootReducer = combineReducers({
  auth,
  alert,
  currentUser,
  messagesprivate,
  userstatus,
})

export default persistReducer(persistConfig, rootReducer)
