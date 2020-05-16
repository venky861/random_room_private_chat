const mongoose = require("mongoose")

const chat = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "google",
  },
  messages: [
    {
      text: {
        type: String,
      },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "google",
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "google",
      },
      adminName: {
        type: String,
      },
      peerName: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now(),
  },
})

mongoose.model("chatuser", chat)
