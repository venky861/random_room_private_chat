const express = require("express")
const router = express.Router()
const passport = require("passport")

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("call back")
    res.redirect("/dashboard")
  }
)

router.get("/auth/current_user", (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    console.log(err)
    res.send("user not logged in")
  }
})

router.get("/api/logout", (req, res) => {
  req.logOut()
  // res.send(req.user)
  res.send("User logged out")
})
module.exports = router
