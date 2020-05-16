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
require("./models/chat")
require("./models/chatroomcount")

const mongoose = require("mongoose")
const chatUser = mongoose.model("chatuser")
const roomCount = mongoose.model("roomcount")

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
app.use("/", require("./routes/privateMessages"))

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Port is running ${PORT}`))

app.post("/venky", (req, res) => {
  //  console.log(req.body)
  res.send("hello post request")
})
app.get("/venky", (req, res) => {
  res.send("hello get request")
})

const io = socketio(server)

const roomsPrivate = {} //  {adminId:socket.id}
const namesPrivate = {} // { socket.id:adminName}
const peersPrivate = {} // {socket.id:peerId}
const databaseIdPrivate = {} // {socket.id:adminId}

// -------------------------------------------------------------------------------------//

const storeRoomUsersInDatabase = async (adminId) => {
  const chatRoom = await roomCount.findOne({ user: adminId })

  let chatCount = {
    user: adminId,
    count: Object.keys(namesPrivate).length,
    users: Object.values(namesPrivate),
  }

  if (!chatRoom) {
    let chat = await new roomCount(chatCount)
    await chat.save()
  } else {
    let chat = await roomCount.findOneAndUpdate(
      { user: adminId },
      { $set: chatCount },
      { new: true }
    )
    await chat.save()
  }
}

const storeMessagesInDatabase = async (
  adminId,
  peerId,
  adminName,
  peerName,
  message
) => {
  console.log(adminId, peerId, adminName, peerName, message)

  if (adminId) {
    const chatProfile = await chatUser.findOne({ user: adminId })
    const chatProfilePeer = await chatUser.findOne({ user: peerId })

    const chatFields = { user: adminId }
    chatFields.messages = {
      text: message,
      from: adminId,
      to: peerId,
      adminName: adminName,
      peerName: peerName,
    }

    const chatFieldsPeer = { user: peerId }
    chatFieldsPeer.messages = {
      text: message,
      from: adminId,
      to: peerId,
      adminName: adminName,
      peerName: peerName,
    }

    if (!chatProfile) {
      let chat = await new chatUser(chatFields)
      await chat.save()
    } else {
      chatProfile.messages.push({
        text: message,
        from: adminId,
        to: peerId,
        adminName: adminName,
        peerName: peerName,
      })

      await chatProfile.save()
    }
    if (!chatProfilePeer) {
      let chat = await new chatUser(chatFieldsPeer)
      await chat.save()
    } else {
      chatProfilePeer.messages.push({
        text: message,
        from: adminId,
        to: peerId,
        adminName: adminName,
        peerName: peerName,
      })

      await chatProfilePeer.save()
    }
  } else {
    console.log("some error occured")
  }
}

// -------------------------------------------------------------------------------------//
io.on("connection", (socket) => {
  // console.log("socket connected", socket.id)

  socket.on(
    "joinPrivate",
    async ({ adminName, adminId, peerName, peerId }, callback) => {
      roomsPrivate[adminId] = socket.id
      peersPrivate[socket.id] = peerId
      namesPrivate[socket.id] = adminName
      databaseIdPrivate[socket.id] = adminId
      //   storeRoomUsersInDatabase(adminId)
      //  console.log("names start", namesPrivate)

      callback()
      //  console.log({ rooms, names, peers, databaseId })
    }
  )

  socket.on("sendMessagePrivate", async (message, callback) => {
    let peerId = peersPrivate[socket.id]
    let room1 = roomsPrivate[peerId]
    let room2 = socket.id
    let adminName = namesPrivate[socket.id]
    let peerName = namesPrivate[room1]
    //  console.log({ peerName })
    let adminId = databaseIdPrivate[socket.id]

    //  storeRoomUsersInDatabase(adminId)

    storeMessagesInDatabase(adminId, peerId, adminName, peerName, message)

    if (room1)
      io.to(room1)
        .to(room2)
        .emit("chat start private", {
          user: adminName,
          text: message,
          time: moment().format("h:mm a"),
        })

    callback()
  })

  let endEconnection = () => {
    let adminId = databaseIdPrivate[socket.id]
    delete namesPrivate[socket.id]
    delete roomsPrivate[adminId]
    delete peersPrivate[socket.id]
    //  console.log("User left the chat , data deleted")

    //  storeRoomUsersInDatabase(adminId)
    delete databaseIdPrivate[socket.id]
    //   console.log("names end connection", namesPrivate)
  }
  socket.on("leave room", () => {
    endEconnection()
  })

  // once user left the chat , socket gets disconnected
  socket.on("disconnect", () => {
    endEconnection()
  })
})

//-----------------------------------------Private chat end's here-------------------------------------------//

// ---------------------------------------------random chat starts here----------------//

const users = [] // [ 1234,5678]
const rooms = {} //  { 1234:'venky#sugu' , 5678:'venky#sugu'}
const names = {} // { 1234:'venky' , 5678: 'sugu'}
const allUsers = {} // {1234:'wholeSocket' , 5678:'wholeSocket'}

let findPeerForSocket = (socket) => {
  // console.log("outside users")
  // console.log("users", users)

  if (users.length > 0) {
    console.log("inside users")
    let peer = users.pop()
    //  console.log("peer id undefned", typeof peer.id !== "undefined")
    //  console.log("socket id undefned", typeof socket.id !== "undefined")
    try {
      let room = peer.id + "#" + socket.id
      // join both in to same room
      peer.join(room)
      socket.join(room)
      // register room to thier names
      rooms[peer.id] = room
      rooms[socket.id] = room
      let socketName = names[socket.id]
      let peerName = names[peer.id]
      socket.emit("userconnected", {
        text: "user connected",
        room: room,
      })
      peer.emit("userconnected", {
        text: "user connected",
        room: room,
      })

      socket.emit("chat start random", {
        user: "admin",
        text: `${peerName} has joined chat `,
        time: moment().format("h:mm a"),
      })

      peer.emit("chat start random", {
        user: "admin",
        text: `${socketName} has joined chat `,
        time: moment().format("h:mm a"),
      })
    } catch (err) {
      socket.emit(
        "ErrorRandom",
        "Error in connection , please try after some time"
      )
    }
  } else {
    users.push(socket)
    socket.emit("only one user")
    console.log("only one user")
  }
}

io.on("connection", (socket) => {
  // console.log("socket connected", socket.id)
  // console.log("length user", users.length)
  socket.on("joinRandom", ({ name }, callback) => {
    //   const { user } = addUser({ id: socket.id, name })
    //  console.log("randomchat name", name)

    names[socket.id] = name
    // console.log(Object.keys(names).length)
    socket.emit("numberOfUsersOnline", Object.keys(names).length)
    allUsers[socket.id] = socket
    //  console.log(names)
    findPeerForSocket(socket)
  })

  // message comes from front end
  socket.on("sendMessageRandom", (message, callback) => {
    let room = rooms[socket.id]
    let originalName = names[socket.id]
    console.log(Object.keys(names).length)
    socket.emit("numberOfUsersOnline", Object.keys(names).length)
    io.to(room).emit("chat start random", {
      user: originalName,
      text: message,
      time: moment().format("h:mm a"),
    })
    callback()
  })

  //when user wants to connect to new chat , put both in a queue

  let endEconnection = () => {
    let room = rooms[socket.id]
    socket.emit("only one user")
    if (room) {
      let roomID = room.split("#")
      let peerID = roomID[0] === socket.id ? roomID[1] : roomID[0]
      let originalName = names[socket.id]
      socket.broadcast
        .to(room)
        .emit("chat done", { text: `${originalName}, has left` })
      // below is for removing rooms , users, names , all user for the one who left
      const removeIndex = users.indexOf(socket)
      if (removeIndex) {
        users.slice(removeIndex, 1)
      }
      delete names[socket.id]
      delete rooms[socket.id]
      delete allUsers[socket.id]
      socket.emit("numberOfUsersOnline", Object.keys(names).length)
      findPeerForSocket(allUsers[peerID])
      //    findPeerForSocket(socket)
    }
  }
  socket.on("leave room", () => {
    endEconnection()
  })

  // once user left the chat , socket gets disconnected
  socket.on("disconnect", () => {
    endEconnection()
  })
})

//  ------------------------------Random chat end's here //

//  ------------------------------Room chat starts's here //

io.on("connection", (socket) => {
  // console.log("socket connected", socket.id)

  // when a new user Join's , notification comes from front end

  socket.on("joinRoom", ({ name, room }, callback) => {
    // console.log(name, room)
    // console.log("joinRoom called")
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

  socket.on("sendMessageRoom", (message, callback) => {
    //  console.log("socket.id", socket.id)
    const { user } = getUser(socket.id)
    //  console.log("user info", user)
    //  console.log("message", message)

    try {
      if (user.room) {
        io.to(user.room).emit("message", {
          user: user.name,
          text: message,
          time: moment().format("h:mm a"),
        })
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        })
      }

      callback()
    } catch (err) {
      socket.emit(
        "ErrorRoom",
        "Error in connection , please try after some time"
      )
    }
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
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})
//  ------------------------------ Room chat code ends here //

// Server static assest
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}
