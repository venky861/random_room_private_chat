const mongoose = require("mongoose")

const room = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "google",
  },
  count: {
    type: Number,
  },
  users: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
})

mongoose.model("roomcount", room)
