import React from "react"
import MessagesPrivate from "./MessagesPrivate"
import InputField from "./InputField"

const MainbarComponent = ({
  peerName,
  statusUser,
  adminId,
  peerId,
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div>
      <div className='wrapperPrivate1 text-center'>
        <h4>{peerName}</h4>
        {statusUser}
      </div>
      <div>
        <MessagesPrivate adminId={adminId} peerId={peerId} />
      </div>
      <div>
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  )
}

export default MainbarComponent
