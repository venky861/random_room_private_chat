const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys.json")
const mongoose = require("mongoose")
const User = mongoose.model("google")
const Userstatus = mongoose.model("userstatus")
const auth = require("../middleware/requireLogin")
const useractive = mongoose.model("userstatus")

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    try {
      //  console.log("req.user", req.user)
      const payload = {
        user: {
          id: req.user.id,
        },
      }
      await new useractive({
        user: req.user.id,
        status: "online",
      }).save()
      let token = jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 })
      console.log("token", token)
      res.cookie("jwt", token)
      res.redirect("/messages")
    } catch (err) {
      console.log(err)
      res.status(500).send("Error in Login with Google")
    }
  }
)

router.get("/token", (req, res) => {
  try {
    res.json({ token: req.cookies.jwt })
  } catch (err) {
    console.log(err)
    res.status(500).send("error in getting token")
  }
})

router.get("/auth/all_user", async (req, res) => {
  try {
    const data = await User.find().select("-password")
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).send("user not logged in")
  }
})

router.get("/auth/current_user", auth, async (req, res) => {
  // console.log(req.user.id)
  try {
    const data = await User.findById(req.user.id).select("-password")
    res.send(data)
  } catch (err) {
    res
      .status(500)
      .send("Error is fetching data for a single user , please login")
  }
})

router.get("/api/logout", auth, async (req, res) => {
  const updateStatus = { status: "offline", lastSeenIn: Date.now() }
  const UserExist = await Userstatus.findOne({ user: req.user.id })

  if (UserExist) {
    const status = await Userstatus.findOneAndUpdate(
      { user: req.user.id },
      { $set: updateStatus },
      { new: true }
    )
  }

  res.clearCookie("jwt")
  req.logOut()
  // res.send(req.user)
  res.send("User logged out")
})

router.post("/api/updateuser", auth, async (req, res) => {
  const data = await User.findById(req.user.id)
  let email = data.email
  let password = data.password

  const { name, age, gender, country } = req.body
  const updatedUser = {
    name,
    age,
    gender,
    country,
    email,
    password,
  }

  const response = await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: updatedUser },
    { new: true }
  )
  res.send(response)
})
module.exports = router
