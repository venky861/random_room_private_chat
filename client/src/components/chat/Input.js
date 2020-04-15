import React from "react"

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className='form-group'>
      <form>
        <div className='input-group form-group-lg'>
          <input
            type='text'
            className='form-control input-group-lg inputtextbox'
            placeholder='Type a message...'
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : ""
            }
            name='message'
          ></input>
          <div className='input-group-append'>
            <button
              className='text-danger input-group-text'
              type='submit'
              onClick={(event) => sendMessage(event)}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Input
