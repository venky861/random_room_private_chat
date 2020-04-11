import React, { useState } from "react"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  })

  const [err, setErr] = useState([])

  const { name, email, password1, password2 } = formData

  const changeHandler = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const validate = (name, email, password1, password2) => {
    const errors = []
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!name && !email && !password1 && !password2) {
      errors.push("Please enter all the fields ")
    } else {
      if (!name) {
        errors.push("Name cannot be empy")
      }
      if (!regexp.test(email)) {
        errors.push("Please enter a valid Email Address")
      }
      if (password1.length < 4 || password2.length < 4) {
        errors.push("Password should be greater than 4 characters")
      }
    }

    if (password1 !== password2) {
      errors.push("Password does not match")
    }

    return errors
  }

  const submitHandler = (event) => {
    event.preventDefault()
    console.log(name, email, password1, password2)
    const errors = validate(name, email, password1, password2)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      console.log(errors)
      setFormData({ name: "", email: "", password1: "", password2: "" })
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
            <h3 className='text-center mt-2'>Registeration</h3>
            <div className='text-center text-danger mt-2'> {List}</div>
            <form className='mt-2' onSubmit={(event) => submitHandler(event)}>
              <div className='form-group'>
                <label>Name:</label>
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  value={name}
                  onChange={(event) => changeHandler(event)}
                />
              </div>

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

              <div className='form-group'>
                {" "}
                <label>Confirm Password</label>
                <input
                  className='form-control'
                  type='password'
                  name='password2'
                  value={password2}
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

export default Register
