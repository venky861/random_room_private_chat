import React, { useState } from "react"
import { connect } from "react-redux"
import { login } from "../actions/auth"
import { Link, Redirect } from "react-router-dom"
import { validateLogin } from "../utils/validate"

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
  })

  const { email, password1 } = formData
  const [err, setErr] = useState([])

  const changeHandler = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    //  console.log(email, password1)
    const errors = validateLogin(email, password1)
    console.log("errors", errors)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      console.log(errors)
      login({ email, password: password1 })
      setFormData({ email: "", password1: "" })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/messages'></Redirect>
  }

  const List =
    err.length > 0
      ? err.map((data, index) => {
          console.log(data)
          return <div key={index}>{data}</div>
        })
      : ""

  return (
    <div className='mt-4'>
      <div className='container '>
        <div className='col-md-7 m-auto'>
          <div className='card card-body mt-2'>
            <h3 className='text-center mt-2'>Login</h3>
            <div className='text-center text-danger mt-2'> {List}</div>
            <form className='mt-2' onSubmit={(event) => submitHandler(event)}>
              <div className='form-group'>
                <label>Email:</label>
                <input
                  className='form-control'
                  type='text'
                  name='email'
                  value={email}
                  onChange={(event) => changeHandler(event)}
                />
              </div>

              <div className='form-group'>
                <label>Password:</label>
                <input
                  className='form-control'
                  type='password'
                  name='password1'
                  value={password1}
                  onChange={(event) => changeHandler(event)}
                />
              </div>

              <button
                type='submit'
                className='btn btn-primary btn-block my-1 mb-3 mt-3'
              >
                Login
              </button>
            </form>
            <p className='text-center my-1'>
              New User? <Link to='/Register'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { login })(Login)
