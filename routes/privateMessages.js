const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const chatUser = mongoose.model("chatuser")
const auth = require("../middleware/requireLogin")

router.get("/api/privatemessages", auth, async (req, res) => {
  try {
    const result = await chatUser.findOne({ user: req.user.id })
    res.send(result)
  } catch (err) {
    res.status(500).send("Error in retriving messages from database")
  }
})

module.exports = router
