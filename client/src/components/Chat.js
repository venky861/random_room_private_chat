import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { dbUserStatus } from "../actions/auth"

const Chat = ({ adminuser, dbUserStatus }) => {
  useEffect(() => {
    adminuser && adminuser._id && dbUserStatus(adminuser._id)
  }, [])

  const LinkToPrivateChat = adminuser ? (
    <Link
      to={`/privatechat?name=${adminuser.name}&id=${adminuser._id}`}
      className='align-middle chat-link'
    >
      Private Chat
    </Link>
  ) : (
    <Link to={`/login`} className='align-middle chat-link'>
      Private Chat
    </Link>
  )

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
              {LinkToPrivateChat}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  adminuser: state.currentUser.user,
  status: state.userstatus.status,
})

export default connect(mapStateToProps, { dbUserStatus })(Chat)
