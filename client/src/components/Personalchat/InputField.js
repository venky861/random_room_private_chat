import React from "react"
import { Link } from "react-router-dom"

const InputField = ({ message, setMessage, sendMessage, exitRoom }) => {
  return (
    <div>
      <div className='form-group'>
        <form>
          <div className='input-group form-group-lg input-box'>
            <input
              type='text'
              className='form-control input-group-lg'
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
                className='btn btn-danger'
                type='submit'
                onClick={(event) => {
                  sendMessage(event)
                }}
              >
                Send
              </button>

              <button
                className='btn btn-primary'
                onClick={(event) => exitRoom(event)}
              >
                <Link to='/joinpersonal' className='text-primary'>
                  Back
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InputField
