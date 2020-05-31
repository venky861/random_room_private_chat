import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import { connect } from "react-redux"
import queryString from "query-string"
import MainbarComponent from "./MainbarComponent"
import { privatemsg, dbUserStatus, typingMessage } from "../../actions/auth"
import Moment from "react-moment"
import SideBarComponent from "./SideBarComponent"
import WelcomeComponent from "./WelcomeComponent"

let socket
const hostname = "localhost:5000"
// const hostname = "https://smschatmail.herokuapp.com/"
socket = io(hostname)
let connected = false
console.log(socket)

const PersonalChat = ({
  adminUser,
  location,
  messageFromDb,
  privatemsg,
  dbUserStatus,
  status,
  typingMessage,
  typingReducer,
  auth: { users },
}) => {
  const [adminName, setAdminName] = useState("")
  const [adminId, setAdminId] = useState("")
  const [peerName, setPeerName] = useState("")
  const [peerId, setPeerId] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [welcomeDisplay, setWelcomeDisplay] = useState(true)

  // const [typingDisplay, setTypingDisplay] = useState("")

  connected = true
  const filteredUsers =
    users && users.filter((user) => user._id !== adminUser._id)

  useEffect(() => {
    const { name, id } = queryString.parse(location.search)
    let adminName = adminUser.name
    let adminId = adminUser._id
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
  }, [hostname, adminUser, peerId, peerName])

  useEffect(() => {
    socket.on("chat start private", (message) => {
      //  console.log(message)
      setMessages((messages) => [...messages, message])
    })
  }, [messages])

  useEffect(() => {
    privatemsg()
  }, [messageFromDb])

  useEffect(() => {
    dbUserStatus(peerId)
  }, [socket.id, peerId, status])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessagePrivate", message, () => setMessage(""))
    }
  }
  /*
  const typingEvent = (event) => {
    event.preventDefault()
    socket.emit("typing message")
    typingMessage(adminId)
    const typeDisplay =
      typingReducer && typingReducer.to === adminId
        ? `${adminName} is typing a message`
        : ""
    setTypingDisplay(typeDisplay)
    console.log(typeDisplay)
  }
*/

  const statusUser = status && (
    <div>
      {status.status === "online" ? (
        <p className='userstatus'>{status.status}</p>
      ) : (
        <div>
          Last seen in:
          <Moment format='h:mm a' className='date mx-1 lastseenin'>
            {status.lastSeenIn}
          </Moment>
        </div>
      )}
    </div>
  )

  // console.log("status", status.status)
  // console.log("last seenin", status.lastSeenIn)

  // console.log(messages)
  // console.log(adminName)

  const display = welcomeDisplay ? (
    <div>
      <WelcomeComponent adminName={adminName} />
    </div>
  ) : (
    <div className='Box2'>
      <MainbarComponent
        peerName={peerName}
        statusUser={statusUser}
        adminId={adminId}
        peerId={peerId}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  )

  return (
    <div className='socketPractice'>
      <div className='container'>
        <div className='EntirePrivateGrid'>
          <div className='Box1'>
            <div className='sideBarBox1'>
              <h4 className='text-center'>Chat</h4>
            </div>
            <div>
              <SideBarComponent
                users={users}
                filteredUsers={filteredUsers}
                setPeerName={setPeerName}
                setPeerId={setPeerId}
                setWelcomeDisplay={setWelcomeDisplay}
                welcomeDisplay={welcomeDisplay}
              />
            </div>
          </div>
          {display}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  status: state.userstatus.status,
  typingReducer: state.userstatus.typing,
  auth: state.auth,
  adminUser: state.currentUser.user,
  messageFromDb: state.messagesprivate.messages.messages,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  privatemsg,
  dbUserStatus,
  typingMessage,
})(PersonalChat)
