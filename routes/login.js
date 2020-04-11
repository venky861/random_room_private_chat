const express = require("express")
const router = express.Router()
const keys = require("../config/keys.json")
const mongoose = require("mongoose")
const User = mongoose.model("google")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/", async (req, res) => {
  const { email, password } = req.body

  try {
    //check user exist in db or not
    const usermail = await User.findOne({ email })

    if (!usermail) {
      return res.status(400).json({ errors: "E-mail does not exist" })
    }

    //password de-crypt

    const isMatch = await bcrypt.compare(password, usermail.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    const payload = {
      user: {
        id: usermail.id,
      },
    }

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err

      res.json({ token })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send("Server error")
  }
})

module.exports = router
