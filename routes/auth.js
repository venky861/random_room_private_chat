const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys.json")

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    console.log("req.user", req.user)
    const payload = {
      user: {
        id: req.user.id,
      },
    }
    let token = jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 })
    console.log("token", token)
    res.cookie("jwt", token)
    res.redirect("/messages")
  }
)

router.get("/token", (req, res) => {
  res.send(req.cookies.jwt)
})

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
