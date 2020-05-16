import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import InputRandom from "./InputRandom"
import MessagesRandom from "./MessagesRandom"
import { Link } from "react-router-dom"

let socket
// const hostname = "localhost:5000"
const hostname = "https://smschatmail.herokuapp.com/"

socket = io(hostname)
let connected = false
// console.log(socket)

const SocketPracticeRandom = ({ location }) => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [disabled, setEnabled] = useState(true)
  const [onlineUsers, setOnlineUsers] = useState("")
  const [error, setError] = useState("")

  connected = true
  // location comes from react router

  socket.on("connect", (data) => {
    // console.log(socket.id)
  })

  /*******************************************************/
  useEffect(() => {
    const { name } = queryString.parse(location.search)

    setName(name)
    // console.log(name)
    //starting to emit connection with name and room

    socket.emit("joinRandom", { name }, (error) => {
      if (error) {
        alert(error)
      }
    })

    return () => {
      socket.emit("disconnect")
      socket.disconnect()
    }
  }, [location.search])

  /*******************************************************/

  useEffect(() => {
    socket.on("chat start random", (message) => {
      // socket fires when both users connects and start to chat
      //  console.log("chat start fired")
      //   console.log(message)
      setMessages((messages) => [...messages, message])
    })
  }, [])

  // console.log(message, messages)

  useEffect(() => {
    socket.on("chat done", (data) => {
      // socket fires when one of the user disconnects, all the array msg's are deleted
      //   console.log("fired")
      //  console.log(data)
      setMessages([])
    })
  }, [])

  useEffect(() => {
    socket.on("userconnected", (data) => {
      // socket fired when both user connects, so waiting is over
      //  console.log("user connected")
      setEnabled(false)
    })
  }, [disabled])

  useEffect(() => {
    socket.on("only one user", (data) => {
      // socket fires when there is only one user in queue , waiting again begins
      console.log("only one user")
      setEnabled(true)
    })
  }, [disabled])

  useEffect(() => {
    socket.on("numberOfUsersOnline", (data) => {
      // shows no of users available
      //  console.log(data)
      setOnlineUsers(data)
    })
  }, [onlineUsers])

  useEffect(() => {
    socket.on("ErrorRandom", (err) => {
      alert(err)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()
    if (message) {
      socket.emit("sendMessageRandom", message, () => setMessage(""))
    }
  }

  socket.on("connect_error", (error) => {
    setError("Error in making connections")
  })

  console.log(error)
  const exitRoom = (event) => {
    event.preventDefault()

    if (connected) {
      socket.emit("leave room")
      socket.disconnect()
      setEnabled(true)
    }

    // connected = false
  }

  const connectAgain = (event) => {
    event.preventDefault()
    socket.emit("leave room")
    socket.disconnect()
    window.location.reload()
  }
  //  console.log(disabled)

  const disabledMessage = disabled ? (
    <div className='disabled'>
      <img
        src='images/loading3.gif'
        alt='loading'
        style={{ height: 20, width: 20 }}
        className='loading'
      />
      <div className='waiting'>Waiting for someone to Join</div>
    </div>
  ) : (
    <div></div>
  )
  const connectAgainMessage = disabled ? (
    <div onClick={(event) => connectAgain(event)}>Reconnect</div>
  ) : (
    <div className='btn-hover'>Disconnect</div>
  )

  return (
    <div>
      <div className='socketPractice'>
        <div className='container'>
          <div className='wrapperRandom1'>
            <Link to='/chat' className='closeWindowColor'>
              <i
                className='fa fa-window-close float-right closeWindow'
                aria-hidden='true'
              ></i>
            </Link>

            <h4 className='m-3 text-center'>Random Chat</h4>
            <h4 className='mb-1 ml-1 online-users'>
              Number of Users Online:{onlineUsers}
            </h4>
            <h4 className='disabledmessage'>{disabledMessage}</h4>
          </div>
          <div>
            <MessagesRandom messages={messages} name={name} />
          </div>
          <InputRandom
            connectAgainMessage={connectAgainMessage}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            disabled={disabled}
            exitRoom={exitRoom}
          />
        </div>
      </div>
    </div>
  )
}

export default SocketPracticeRandom
