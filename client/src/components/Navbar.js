import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { auth, logout } from "../actions/auth"
import { Link } from "react-router-dom"

const Navbar = ({ auth, logout, authreducer }) => {
  const { isAuthenticated } = authreducer
  const [open, setOpen] = useState(false)
  console.log(open)
  let containerr = React.createRef()

  const componentDidMount = () => {
    document.addEventListener("mousedown", handleClickOutside)
  }
  const componentWillUnmount = () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }

  const handleClickOutside = (event) => {
    if (containerr.current && containerr.current.contains(event.target)) {
      setOpen(true)
    }
  }

  const clicked = (event) => {
    setOpen((prevState) => {
      return !prevState
    })
  }

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
    <ul className='navbar-nav navbar-expand'>
      <li className='nav-item mx-3 nav-items-smallerscreen'>
        {" "}
        <a
          href='/auth/google'
          className='nav-link text-color-nav'
          onClick={() => auth()}
        >
          Google Sign-in
        </a>
      </li>
      <li className='nav-item mx-3 nav-items-smallerscreen'>
        {" "}
        <Link to='/login' className='nav-link text-color-nav'>
          Login
        </Link>
      </li>
      <li className='nav-item mx-3 nav-items-smallerscreen'>
        {" "}
        <Link to='/register' className='nav-link text-color-nav'>
          Register
        </Link>
      </li>
      <li className='nav-item mx-3 nav-items-smallerscreen'>
        {" "}
        <Link to='/chat' className='nav-link text-color-nav'>
          Chat
        </Link>
      </li>
    </ul>
  )
  return (
    <div className='mt-0 mb-0'>
      <div className='navbar navbar-color'>
        {/*  <i
          className='fa fa-bars menu-icon'
          aria-hidden='true'
          ref={containerr}
          onClick={(event) => clicked(event)}
        ></i>
    */}
        <div>
          <Link to='/' className='nav-link text-color-nav font-smallerScreens'>
            Home
          </Link>
        </div>
        <div className='navbar-nav ml-auto nav-display font-smallerScreens'>
          {!isAuthenticated ? (
            <Fragment>{guestLink}</Fragment>
          ) : (
            <Fragment>{authLinks}</Fragment>
          )}
        </div>
        {/*   <div className='navbar-nav ml-auto toggle-items'>
          {open ? (
            !isAuthenticated ? (
              <Fragment>{guestLink}</Fragment>
            ) : (
              <Fragment>{authLinks}</Fragment>
            )
          ) : (
            ""
          )}
 </div>
          */}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  authreducer: state.auth,
})
export default connect(mapStateToProps, { auth, logout })(Navbar)
