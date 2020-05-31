import React, { useEffect } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import MessagePrivate from "./MessagePrivate"
import { connect } from "react-redux"

const MessagesPrivate = ({ messageFromDb, adminId, peerId }) => {
  //  console.log(messageFromDb.messages)
  //console.log(messageFromDb.status)
  // console.log(messageFromDb.lastSeenIn)

  const messageBetweenAdminAndPeer =
    messageFromDb.messages &&
    messageFromDb.messages.filter(
      (msg) =>
        (msg.from === adminId && msg.to === peerId) ||
        (msg.from === peerId && msg.to === adminId)
    )

  // console.log(messageBetweenAdminAndPeer)

  const mapMessagesBetweenAdminAndPeer =
    messageBetweenAdminAndPeer &&
    messageBetweenAdminAndPeer.map((msg) => (
      <div key={msg._id}>
        <MessagePrivate
          adminName={msg.adminName}
          peerName={msg.peerName}
          from={msg.from}
          to={msg.to}
          text={msg.text}
          date={msg.date}
          active={messageFromDb.status}
          lastSeenIn={messageFromDb.lastSeenIn}
        />
      </div>
    ))
  return (
    <ScrollToBottom className='wrapperPrivate'>
      {mapMessagesBetweenAdminAndPeer}
    </ScrollToBottom>
  )
}

const mapStateToProps = (state) => ({
  messageFromDb: state.messagesprivate.messages,
})

export default connect(mapStateToProps)(MessagesPrivate)
