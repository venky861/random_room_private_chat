import React from "react"
import { Link } from "react-router-dom"
const Infobarchat = ({ room }) => {
  return (
    <div className=''>
      <Link to='/chat'>
        <div className='text-dark leaveroom mr-2'>Leave Room</div>{" "}
      </Link>
      <div className='text-center'>Chat Room</div>
    </div>
  )
}

export default Infobarchat
