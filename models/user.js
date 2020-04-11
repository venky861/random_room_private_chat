const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})
mongoose.model("register", userschema)
