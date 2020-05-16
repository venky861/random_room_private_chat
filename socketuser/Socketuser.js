const users = []

const addUser = ({ id, name, room }) => {
  // console.log("add user called")
  if (name) {
    name = name.trim().toLowerCase()
  }
  if (room) {
    room = room.trim().toLowerCase()
  }

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  )

  if (existingUser) {
    return {
      error:
        "User with same name already exist, please choose different name and Join again",
    }
  }
  //  console.log("add user", name, room)
  let user = { id, name, room }
  users.push(user)
  //  console.log("adduser", user)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index != -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => {
  const user = users.find((user) => user.id === id)
  /*
  if (user) {
    console.log("get user", user)
  }
*/
  return { user }
}

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }
