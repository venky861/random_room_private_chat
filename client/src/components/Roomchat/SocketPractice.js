import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import Infobarchat from "./Infobarchat"
import Input from "./Input"
import Messages from "./Messages"
import Sidebar from "./Sidebar"
import { withRouter } from "react-router-dom"

let socket
// const hostname = "localhost:5000"
const hostname = "https://smschatmail.herokuapp.com/"

socket = io(hostname)

const SocketPractice = ({ location, history }) => {
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
    // console.log(name, room)
    setName(name)
    setRoom(room)

    //starting to emit connection with name and room

    socket.emit("joinRoom", { name, room }, (error) => {
      if (error) {
        alert(error)
        history.push("/joinroom")
      }
    })

    return () => {
      socket.emit("disconnect")
      socket.disconnect()
    }
  }, [location.search])

  /*******************************************************/

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })
  }, [])

  useEffect(() => {
    socket.on("ErrorRoom", (err) => {
      alert(err)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessageRoom", message, () => setMessage(""))
    } else if (file) {
      socket.emit("sendMessageRoom", file, () => setFile(""))
    }
  }

  // console.log(file)
  // console.log(message)
  return (
    <div className='socketPractice'>
      <div className='container'>
        <div className='wrapperRoom1'>
          <Infobarchat room={room} />
        </div>
        <div className='wrapperRoom2'>
          <div className='boxroomsidebar'>
            <Sidebar users={users} room={room} />
          </div>
          <div>
            <Messages name={name} messages={messages} />
          </div>
        </div>

        <div className='wrapperRoom3'>
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

export default withRouter(SocketPractice)
