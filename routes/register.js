const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("google")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys.json")
const bcrypt = require("bcryptjs")
const useractive = mongoose.model("userstatus")

router.post("/", async (req, res) => {
  const { name, email, password, gender, age, country } = req.body

  try {
    const usermail = await User.findOne({ email })

    if (usermail) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email ID already exist" }] })
    }

    // create user
    console.log(age)
    const user = await new User({ email, name, password, gender, age, country })

    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(user.password, salt, async (err, hash) => {
        if (err) throw err

        user.password = hash
        await user.save()
      })
    )

    //  console.log(user)
    await new useractive({
      user: user.id,
      status: "online",
    }).save()
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.cookie("jwt", token)
      res.json({ token })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send("Error in registering")
  }
})

module.exports = router
