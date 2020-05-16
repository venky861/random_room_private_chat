import React, { Fragment } from "react"
import { connect } from "react-redux"
import { auth, logout } from "../actions/auth"
import { Link } from "react-router-dom"

const Navbar = ({ auth, logout, authreducer }) => {
  const { isAuthenticated } = authreducer
  const authLinks = (
    <ul className='navbar-nav navbar-expand'>
      <li className='nav-item mx-3'>
        <Link to='/editprofile' className='nav-link text-color-nav'>
          Profile
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/chat' className='nav-link text-color-nav'>
          Chat
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/messages' className='nav-link text-color-nav'>
          Send free sms
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/' onClick={logout} className='nav-link text-color-nav'>
          Logout
        </Link>
      </li>
    </ul>
  )
  const guestLink = (
    <ul className='navbar-nav navbar-expand '>
      <li className='nav-item mx-3 '>
        {" "}
        <a
          href='/auth/google'
          className='nav-link text-color-nav'
          onClick={() => auth()}
        >
          Sign in with Google
        </a>
      </li>
      <li className='nav-item mx-3 '>
        {" "}
        <a href='/login' className='nav-link text-color-nav'>
          Login
        </a>
      </li>
      <li className='nav-item mx-3 '>
        {" "}
        <a href='/register' className='nav-link text-color-nav'>
          Register
        </a>
      </li>
      <li className='nav-item mx-3 '>
        {" "}
        <a href='/chat' className='nav-link text-color-nav'>
          Chat
        </a>
      </li>
    </ul>
  )
  return (
    <div className='mt-0 mb-0'>
      <div className='navbar navbar-color'>
        <div>
          <Link to='/' className='nav-link text-color-nav'>
            Home
          </Link>
        </div>
        <div className='navbar-nav ml-auto'>
          {!isAuthenticated ? (
            <Fragment>{guestLink}</Fragment>
          ) : (
            <Fragment>{authLinks}</Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authreducer: state.auth,
})
export default connect(mapStateToProps, { auth, logout })(Navbar)
