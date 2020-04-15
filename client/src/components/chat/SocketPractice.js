import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import Infobarchat from "./Infobarchat"
import Input from "./Input"
import Messages from "./Messages"
import Sidebar from "./Sidebar"

let socket
const ENDPOINT = "https://pure-brook-40724.herokuapp.com/"
socket = io(ENDPOINT)

const Socketpractice = ({ location }) => {
  const [file, setFile] = useState("")
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [users, setUsers] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  // location comes from react router

  /*******************************************************/
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    setName(name)
    setRoom(room)

    //starting to emit connection with name and room

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })

    return () => {
      socket.emit("disconnect")
      socket.disconnect()
    }
  }, [location.search, ENDPOINT])

  /*******************************************************/

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""))
    }
  }

  // console.log(message, messages)
  return (
    <div className='containerr'>
      <div className='containheight'>
        <div className='sidenav'>
          {" "}
          <Sidebar users={users} room={room} />{" "}
        </div>
        <div className='infobar'>
          {" "}
          <Infobarchat room={room} />
        </div>
        <div>
          <Messages name={name} messages={messages} />
        </div>
        <div className='footer'>
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            setFile={setFile}
          />
        </div>
      </div>
    </div>
  )
}

export default Socketpractice
