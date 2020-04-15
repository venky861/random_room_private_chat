import React, { Fragment } from "react"
import ReactEmoji from "react-emoji"
import ScrollToBottom from "react-scroll-to-bottom"

const Message = ({ msg: { user, text, time }, name }) => {
  let IsCurrentUser = false
  const trimmedName = name.trim().toLowerCase()

  if (user === name) {
    IsCurrentUser = true
  }

  const messageList = IsCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-1'>{trimmedName}</p>
      <div className='messageBox backgroundBlue'>
        <p className='messageText colorWhite'>
          <ScrollToBottom>
            {" "}
            {ReactEmoji.emojify(text)} {time}
          </ScrollToBottom>
        </p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className='messageBox bg-dark'>
        <p className='messageText colorDark'>
          <ScrollToBottom>
            {" "}
            {ReactEmoji.emojify(text)} {time}
          </ScrollToBottom>
        </p>
      </div>
      <p className='sentText pl-1'>{user}</p>
    </div>
  )
  return <div>{messageList}</div>
}

export default Message
