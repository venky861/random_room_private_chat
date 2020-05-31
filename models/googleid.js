const mongoose = require("mongoose")

const googleSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  photos: [{ value: { type: String } }],
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  country: {
    type: String,
  },
})
mongoose.model("google", googleSchema)
