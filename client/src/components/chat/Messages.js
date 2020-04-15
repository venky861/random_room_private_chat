import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className='mainbar'>
      {messages.map((msg, index) => (
        <div key={index}>
          <Message name={name} msg={msg} />
        </div>
      ))}
    </ScrollToBottom>
  )
}

export default Messages
