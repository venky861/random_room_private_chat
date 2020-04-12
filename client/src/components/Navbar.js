import React, { Fragment } from "react"
import { connect } from "react-redux"
import { auth, logout } from "../actions/auth"
import { Link } from "react-router-dom"

const Navbar = ({ auth, logout, authreducer }) => {
  const { isAuthenticated, loading } = authreducer
  const authLinks = (
    <ul className='navbar-nav navbar-expand'>
      <li className='nav-item mx-3'>
        <Link to='/messages' className='nav-link'>
          Send free sms
        </Link>
      </li>
      <li className='nav-item mx-3'>
        <Link to='/' onClick={logout} className='nav-link'>
          Logout
        </Link>
      </li>
    </ul>
  )
  const guestLink = (
    <ul className='navbar-nav navbar-expand '>
      <li className='nav-item mx-3 '>
        {" "}
        <a href='/auth/google' className='nav-link' onClick={() => auth()}>
          Login with Google
        </a>
      </li>
    </ul>
  )
  return (
    <div className='mt-0'>
      <div className='navbar '>
        <div>
          <Link to='/' className='nav-link'>
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
