const express = require("express")
const app = express()
const keys = require("./config/keys.json")
const passport = require("passport")
const path = require("path")
const cors = require("cors")
const moment = require("moment")

const socketio = require("socket.io")
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./socketuser/Socketuser")

const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")

app.use(cors())

require("./models/user")
require("./models/googleid")

const connectDB = require("./config/db")
require("./services/passport")
connectDB()
app.use(cookieParser())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json({ extended: false }))

app.get("/welcome", (req, res) => {
  res.send("welcome venkat")
})

app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/", require("./routes/auth"))
app.use("/", require("./routes/sms"))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Port is running ${PORT}`))

app.post("/venky", (req, res) => {
  console.log(req.body)
  res.send("hello post request")
})
app.get("/venky", (req, res) => {
  res.send("hello get request")
})

/*


app.get("/", (req, res) => {
  res.render("index.ejs")
})

const expressLayouts = require("express-ejs-layouts")
// app.use(express.static(path.join(__dirname, "public")))

//inite middleware expresslayout EJS

// app.set("view engine", "ejs")


*/

const io = socketio(server)

io.on("connection", (socket) => {
  console.log("socket connected", socket.id)

  // when a new user Join's , notification comes from front end
  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room)
    console.log(socket.id)
    const { user, error } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)
    socket.emit("message", {
      user: "admin",
      text: `${user.name} , welcome to the room ${user.room}`,
      time: moment().format("h:mm a"),
    })

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined`,
      time: moment().format("h:mm a"),
    })
    socket.join(user.room)

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
    callback()
  })

  socket.on("sendMessage", (message, callback) => {
    console.log("socket.id", socket.id)
    const { user } = getUser(socket.id)
    console.log("user info", user)
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
      time: moment().format("h:mm a"),
    })
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    })
    callback()
  })

  // once user left the chat , socket gets disconnected
  socket.on("disconnect", () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
        time: moment().format("h:mm a"),
      })
    }
  })
})

// Server static assest
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}
