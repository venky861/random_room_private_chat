import React, { useState } from "react"

const Login = () => {
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

  const validate = (email, password1) => {
    const errors = []
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regexp.test(email)) {
      errors.push("Please enter a valid Email Address")
    }
    if (password1.length < 4) {
      errors.push("Password should be greater than 4 characters")
    }

    return errors
  }

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(email, password1)
    const errors = validate(email, password1)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      console.log(errors)
      setFormData({ email: "", password1: "" })
    }
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
