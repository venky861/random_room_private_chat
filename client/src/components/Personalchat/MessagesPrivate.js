import React, { useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import MessagePrivate from "./MessagePrivate"
import { connect } from "react-redux"
import { privatemsg } from "../../actions/auth"

const MessagesPrivate = ({
  messageFromDb,
  adminId,
  peerId,
  privatemsg,
  messages,
  message,
  adminName,
  peerName,
}) => {
  console.log(messageFromDb.messages.messages)

  useEffect(() => {
    privatemsg()
    console.log("personal chat called inside useeffect")
  }, [
    privatemsg,
    messages,
    message,
    adminId,
    adminName,
    peerId,
    peerName,
    messageFromDb,
  ])

  const messageBetweenAdminAndPeer = messageFromDb.messages.messages.filter(
    (msg) =>
      (msg.from === adminId && msg.to === peerId) ||
      (msg.from === peerId && msg.to === adminId)
  )

  console.log(messageBetweenAdminAndPeer)

  return (
    <ScrollToBottom className='wrapperPrivate'>
      {messageBetweenAdminAndPeer.map((msg) => (
        <div key={msg._id}>
          <MessagePrivate
            adminName={msg.adminName}
            peerName={msg.peerName}
            from={msg.from}
            to={msg.to}
            text={msg.text}
            date={msg.date}
          />
        </div>
      ))}
    </ScrollToBottom>
  )
}

const mapStateToProps = (state) => ({
  messageFromDb: state.messagesprivate,
})

export default connect(mapStateToProps, { privatemsg })(MessagesPrivate)
