import React from "react"
import { Link } from "react-router-dom"
const Infobarchat = ({ room }) => {
  return (
    <div className=''>
      <Link to='/join'>
        <div className='text-right text-dark leaveroom'>Leave Room</div>{" "}
      </Link>
      <div className='text-center'>Chat Room</div>
    </div>
  )
}

export default Infobarchat
