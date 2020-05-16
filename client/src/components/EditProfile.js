import React, { useState } from "react"
import { connect } from "react-redux"
import { profileedit } from "../actions/auth"
import { nameValidate } from "../utils/validate"
import { loadcurrentuser } from "../actions/auth"
// import setAuthToken from "../utils/setAuthToken"
import { CountryList, AgeList } from "./List"
import { withRouter } from "react-router-dom"

const EditProfile = ({ profileedit, currentUser: { user }, history }) => {
  /* useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      loadcurrentuser()
    }
  }, [loadcurrentuser])
  */
  const [profileUpdateDone, setProfileUpdateDone] = useState("")

  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    gender: user.gender,
    country: user.country,
  })

  console.log(user)
  const [err, setErr] = useState([])

  const { name, age, gender, country } = formData
  // console.log(password1, password2)
  console.log(name, age, country, gender)
  const changeHandler = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
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
    console.log(name, age, country, gender)
    const errors = nameValidate(name)
    console.log("errors", errors)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      console.log({ errors })
      let editProfileData = { name, age, gender, country }
      profileedit(editProfileData, history)
      setProfileUpdateDone("Profile Updated")

      setTimeout(() => {
        setProfileUpdateDone("")
      }, 3000)
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
            <h4 className='text-center mt-2 text-danger'>
              {profileUpdateDone}
            </h4>
            <h3 className='text-center mt-2'>About me</h3>
            <div className='text-center text-danger mt-2'> {List}</div>
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
                    onChange={(event) => changeHandler(event)}
                    value='male'
                    checked={gender === "male"}
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

              <button
                type='submit'
                className='btn btn-primary btn-block my-1 mb-3 mt-3'
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
})
export default connect(mapStateToProps, { profileedit, loadcurrentuser })(
  withRouter(EditProfile)
)
