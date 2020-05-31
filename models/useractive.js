const mongoose = require("mongoose")

const useractive = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "google",
  },
  status: {
    type: String,
    default: "offline",
  },
  lastSeenIn: {
    type: Date,
    default: Date.now(),
  },

  date: {
    type: Date,
    default: Date.now(),
  },
})

mongoose.model("userstatus", useractive)
