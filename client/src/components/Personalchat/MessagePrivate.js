import React, { useEffect } from "react"
import ReactEmoji from "react-emoji"
import ScrollToBottom from "react-scroll-to-bottom"
import { connect } from "react-redux"
import Moment from "react-moment"

// import { privatemsg } from "../../actions/auth"

const MessagePrivate = ({
  adminName,
  peerName,
  from,
  to,
  text,
  date,
  currentUser,
}) => {
  let IsCurrentUser = false

  if (from === currentUser) {
    IsCurrentUser = true
  }
  // console.log(currentUser)

  const messageList = IsCurrentUser ? (
    <div>
      <div>
        <div className='messageContainer justifyEnd mr-1'>
          <div className='sentText pr-1'>{adminName}</div>
          <div className='messageBox backgroundBlue'>
            <div className='messageText colorWhite'>
              <ScrollToBottom>
                {" "}
                {ReactEmoji.emojify(text)}{" "}
                <Moment format='h:mm a' className='date mx-1'>
                  {date}
                </Moment>
              </ScrollToBottom>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className='messageContainer justifyStart ml-1'>
        <div className='messageBox bg-dark'>
          <div className='messageText colorDark'>
            <ScrollToBottom>
              {ReactEmoji.emojify(text)}{" "}
              <Moment format='h:mm a' className='date mx-1'>
                {date}
              </Moment>
            </ScrollToBottom>
          </div>
        </div>
        <div className='sentText pl-1'>{peerName}</div>
      </div>
    </div>
  )
  return <div>{messageList}</div>
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser.user._id,
})

export default connect(mapStateToProps)(MessagePrivate)
