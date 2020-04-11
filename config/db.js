const mongoose = require("mongoose")
const key = require("./keys.json")
const db = key.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log("mongodb connected")
  } catch (err) {
    console.log(err)
    //exit
    process.exit(1)
  }
}

module.exports = connectDB
