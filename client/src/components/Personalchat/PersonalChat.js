import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import { connect } from "react-redux"
import queryString from "query-string"
import InputField from "./InputField"
import MessagesPrivate from "./MessagesPrivate"

let socket
const hostname = "localhost:5000"
socket = io(hostname)
let connected = false
// console.log(socket)

const PersonalChat = ({ adminUser, location }) => {
  const [adminName, setAdminName] = useState("")
  const [adminId, setAdminId] = useState("")
  const [peerName, setPeerName] = useState("")
  const [peerId, setPeerId] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  connected = true

  useEffect(() => {
    const { name, id } = queryString.parse(location.search)
    if (adminUser) {
      let adminName = adminUser.name
      let adminId = adminUser._id
    }
    let peerName = name
    let peerId = id

    setAdminName(adminName)
    setAdminId(adminId)
    setPeerName(peerName)
    setPeerId(peerId)

    socket.emit(
      "joinPrivate",
      { adminName, adminId, peerName, peerId },
      (error) => {
        if (error) {
          alert(error)
        }
      }
    )

    return () => {
      socket.emit("disconnect")
      socket.disconnect()
    }
  }, [hostname, adminUser])

  //  console.log({ adminId, adminUser, peerId, peerName })
  useEffect(() => {
    socket.on("chat start private", (message) => {
      setMessages((messages) => [...messages, message])
    })
  }, [])

  const exitRoom = (event) => {
    event.preventDefault()

    if (connected) {
      console.log("disconnect called")
      socket.emit("leave room")
      socket.disconnect()
    }
    // connected = false
  }

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessagePrivate", message, () => setMessage(""))
    }
  }

  // console.log(messages)
  // console.log(adminName)
  return (
    <div className='socketPractice'>
      <div className='container'>
        <div className='wrapperPrivate1 text-center'>
          <h4>{peerName}</h4>
        </div>

        <div>
          <MessagesPrivate
            adminId={adminId}
            peerId={peerId}
            messages={messages}
            message={message}
            adminName={adminName}
            peerName={peerName}
          />
        </div>
        <div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            exitRoom={exitRoom}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  adminUser: state.currentUser.user,
})

export default connect(mapStateToProps)(PersonalChat)
