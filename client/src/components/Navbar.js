import React from "react"
import { connect } from "react-redux"
import { auth } from "../actions/auth"

const Navbar = ({ auth }) => {
  const authLinks = (
    <ul>
      <li>Logout</li>
    </ul>
  )
  const guestLink = (
    <ul className='navbar-nav navbar-expand '>
      <li>
        {" "}
        <a href='/auth/google' onClick={() => auth()}>
          Login with Google
        </a>
      </li>
    </ul>
  )
  return (
    <div className='mt-0'>
      <div className='navbar navbar-dark '>
        <div className='navbar-nav'>navbar</div>
        <div className=''>{guestLink}</div>
      </div>
    </div>
  )
}

export default connect(null, { auth })(Navbar)
