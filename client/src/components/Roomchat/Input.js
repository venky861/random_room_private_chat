import React from "react"

const Input = ({ message, setMessage, sendMessage, setFile }) => {
  return (
    <div className='form-group'>
      <form>
        <div className='input-group form-group-lg'>
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
            <label htmlFor='files' className='input-group-text'>
              <i className='fa fa-paperclip' aria-hidden='true'></i>
            </label>
            <input
              type='file'
              id='files'
              className='input-group-text'
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]))
              }}
              style={{ display: "none" }}
            />
          </div>
          <div className='input-group-append'>
            <button
              className='btn btn-room input-group-text'
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
