const mongoose = require("mongoose")

const typing = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "google",
  },
  status: {
    type: String,
    default: "Typing a message",
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "google",
  },
})

mongoose.model("typingplaceholder", typing)
