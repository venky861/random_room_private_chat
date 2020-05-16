import React from "react"

const InputRandom = ({
  connectAgainMessage,
  message,
  setMessage,
  sendMessage,
  disabled,
  exitRoom,
}) => {
  return (
    <div>
      <div className='form-group'>
        <form>
          <div className='input-group form-group-lg input-box'>
            <input
              type='text'
              className='form-control input-group-lg '
              placeholder='Type a message...'
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : ""
              }
              name='message'
              disabled={disabled}
            ></input>

            <div className='input-group-append'>
              <button
                className='btn btn-send input-group-text'
                type='submit'
                onClick={(event) => sendMessage(event)}
              >
                Send
              </button>

              <button
                className='btn btn-disconnect'
                onClick={(event) => exitRoom(event)}
              >
                {connectAgainMessage}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InputRandom
