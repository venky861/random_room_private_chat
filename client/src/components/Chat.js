import React from "react"
import { Link } from "react-router-dom"

const Chat = () => {
  return (
    <div className='chat-top'>
      <div className='container'>
        <div className='col-md-6 m-auto'>
          <div className='card  card-body card-color'>
            <h4 className=' text-center chat-heading mt-2'>
              Choose any one of the below chat
            </h4>
            <div className='text-center form-control formcontrol mt-3'>
              {" "}
              <Link to='/joinrandom' className='align-middle chat-link'>
                Random Chat
              </Link>
            </div>
            <div className='text-center form-control formcontrol mt-3'>
              {" "}
              <Link to='/joinroom' className='align-middle chat-link'>
                Room Chat
              </Link>
            </div>
            <div className='text-center form-control formcontrol mt-3'>
              {" "}
              <Link to='/joinprivate' className='align-middle chat-link'>
                Private Chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
