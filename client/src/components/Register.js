import React, { useState } from "react"
import { connect } from "react-redux"
import { register } from "../actions/auth"
import { Link, Redirect } from "react-router-dom"
import { validateRegister } from "../utils/validate"
import { CountryList, AgeList } from "./List"

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    age: 18,
    gender: "male",
    country: "India",
  })

  const [err, setErr] = useState([])

  const { name, email, password1, password2, age, gender, country } = formData
  // console.log(password1, password2)
  console.log(age)
  console.log(country)
  const changeHandler = (event) => {
    event.preventDefault()
    event.target.type === "checked"
      ? setFormData({ ...formData, [event.target.name]: event.target.checked })
      : setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const changeHandlerSelect = (event) => {
    event.preventDefault()
    setFormData({
      ...formData,
      country: event.target.value,
    })
  }

  const changeHandlerAge = (event) => {
    event.preventDefault()
    setFormData({
      ...formData,
      age: event.target.value,
    })
  }
  const submitHandler = (event) => {
    event.preventDefault()
    // console.log(name, email, password1, password2)
    event.preventDefault()
    // console.log(name, email, password1, password2)
    console.log({ gender })
    const errors = validateRegister(name, email, password1, password2)
    console.log(age)
    console.log("errors", errors)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      console.log(errors)
      register({ name, email, password: password1, age, gender, country })
      setFormData({
        name: "",
        email: "",
        password1: "",
        password2: "",
        age: "",
        gender: "",
        country: "",
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to='/messages'></Redirect>
  }

  const ListOfErrors =
    err.length > 0
      ? err.map((data, index) => {
          console.log(data)
          return <div key={index}>{data}</div>
        })
      : ""

  return (
    <div className='mt-4 registeraion-smallScreen'>
      <div className='container '>
        <div className='col-md-7 m-auto'>
          <div className='card card-body mt-2 '>
            <h3 className='text-center mt-2'>Registeration</h3>
            <div className='text-center text-danger mt-2'> {ListOfErrors}</div>
            <form className='mt-2' onSubmit={(event) => submitHandler(event)}>
              <div className='form-group input-group mt-2'>
                <div className='input-group-prepend w-100 '>
                  <label className=' input-group-text widthname fontregister labelcolor'>
                    Name:
                  </label>
                  <input
                    className='w-100'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(event) => changeHandler(event)}
                  />
                </div>
              </div>
              <AgeList changeHandlerAge={changeHandlerAge} value={age} />
              <CountryList
                country={country}
                changeHandlerSelect={changeHandlerSelect}
                value={country}
              />

              <div className='form-group input-group mt-2'>
                <div className='input-group-prepend mt-3'>
                  <label className='input-group-text widthgender fontregister labelcolor'>
                    Gender:
                  </label>
                  <label className='ml-1'>Male</label>{" "}
                  <input
                    className='mt-2 ml-1'
                    type='radio'
                    name='gender'
                    value='male'
                    checked={gender === "male"}
                    onChange={(event) => changeHandler(event)}
                  ></input>
                  <label className='ml-2 mr-2'>female </label>
                  <input
                    className='mt-2 ml-1'
                    type='radio'
                    name='gender'
                    value='female'
                    checked={gender === "female"}
                    onChange={(event) => changeHandler(event)}
                  ></input>
                </div>
              </div>
              <div className='form-group input-group mt-2'>
                <div className='input-group-prepend w-100 mt-3'>
                  <label className='input-group-text widthname fontregister labelcolor'>
                    Email:
                  </label>
                  <input
                    className='w-100'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(event) => changeHandler(event)}
                  />
                </div>
              </div>
              <div className='form-group input-group mt-2'>
                <div className='input-group-prepend w-100 mt-3'>
                  <label className='input-group-text widthname fontregister labelcolor'>
                    Password:
                  </label>
                  <input
                    className='w-100'
                    type='password'
                    name='password1'
                    value={password1}
                    onChange={(event) => changeHandler(event)}
                  />
                </div>
              </div>
              <div className='form-group input-group mt-2'>
                <div className=' input-group-prepend w-100 mt-3'>
                  {" "}
                  <label className='input-group-text widthname fontregister labelcolor'>
                    Confirm Password
                  </label>
                  <input
                    className='w-100'
                    type='password'
                    name='password2'
                    value={password2}
                    onChange={(event) => changeHandler(event)}
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-block my-1 mb-3 mt-3'
              >
                Register
              </button>
            </form>
            <p className='text-center my-2'>
              Have a account? <Link to='/Login'>Login</Link>
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
export default connect(mapStateToProps, { register })(Register)
