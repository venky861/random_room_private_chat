const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const chatUser = mongoose.model("chatuser")
const userstatus = mongoose.model("userstatus")
const typer = mongoose.model("typingplaceholder")
const auth = require("../middleware/requireLogin")

router.get("/api/privatemsg", auth, async (req, res) => {
  try {
    const result = await chatUser.findOne({ user: req.user.id })
    res.send(result)
  } catch (err) {
    res.status(500).send("Error in retriving messages from database")
  }
})

router.get("/api/dbuserstatus", auth, async (req, res) => {
  try {
    const result = await userstatus.find()
    res.send(result)
  } catch (err) {
    res.status(500).send("Error in retriving messages from database")
  }
})

router.get("/api/dbuserstatus/:user_id", auth, async (req, res) => {
  try {
    const result = await userstatus.findOne({ user: req.params.user_id })
    res.send(result)
  } catch (err) {
    res.status(500).send("Error in retriving messages from database")
  }
})

router.get("/api/typing/:user_id", auth, async (req, res) => {
  try {
    const result = await typer.findOne({ user: req.params.user_id })
    res.send(result)
  } catch (err) {
    res.status(500).send("Error in typing message")
  }
})
module.exports = router
