import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import MessageRandom from "./MessageRandom"

const MessagesRandom = ({ messages, name }) => {
  return (
    <ScrollToBottom className='wrapperRandom2'>
      {messages.map((msg, index) => (
        <div key={index}>
          <MessageRandom name={name} msg={msg} />
        </div>
      ))}
    </ScrollToBottom>
  )
}

export default MessagesRandom
