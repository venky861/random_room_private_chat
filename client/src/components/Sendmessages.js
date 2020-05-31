import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { sendsms, loadalluser, token, loadcurrentuser } from "../actions/auth"
import setAuthToken from "../utils/setAuthToken"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const Sendmessages = ({ sendsms, loadalluser, token, loadcurrentuser }) => {
  useEffect(() => {
    token()
    loadalluser()
  }, [loadalluser, token, loadcurrentuser])

  const [formData, setFormData] = useState({
    textmessage: "",
    num: "",
  })

  const [err, setErr] = useState([])
  const { textmessage, num } = formData
  const [dummy, setDummy] = useState(0)
  const [messageStatus, setMessageStatus] = useState("")

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      loadcurrentuser()
    }
  }, [dummy])

  setTimeout(() => setDummy(1), 1000)

  const changeHandler = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const validate = (textmessage, num) => {
    const errors = []
    if (!textmessage) {
      errors.push("Please enter a text message")
    }
    if (num.length < 9) {
      errors.push("Enter a valid mobile number")
    }

    return errors
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    console.log(num, textmessage)
    const errors = validate(textmessage, num)
    console.log(errors)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      setMessageStatus("Message has been sent")
      sendsms({ num, textmessage })
      setFormData({ num: "", textmessage: "" })
      setTimeout(() => setMessageStatus(""), 3000)
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
    <div className='mt-4 container'>
      <h3 className='text-primary text-center mt-2'>SEND FREE SMS</h3>
      <h3 className='text-primary text-danger mt-2'>{messageStatus}</h3>
      <div className='text-center text-danger mt-2'> {List}</div>
      <div className='mt-2'>
        <form onSubmit={(event) => submitHandler(event)} className='mt-4'>
          <div className='form-group'>
            <label className='text-dark'>Enter your mobile number: </label>
            <input
              className='form-control'
              type='number'
              name='num'
              value={num}
              onChange={(event) => changeHandler(event)}
            />
            <p className='mt-2 mobilenumberformat'>
              Mobile number should be in format: +919600XXXXXX
            </p>
          </div>
          <div className='form-group mt-2'>
            <label className='text-dark'>
              Enter your text to send a message:{" "}
            </label>
            <textarea
              className='form-control'
              name='textmessage'
              value={textmessage}
              row='5'
              column='40'
              onChange={(event) => changeHandler(event)}
            ></textarea>
          </div>
          <button className='btn btn-primary' type='submit'>
            {" "}
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default connect(null, { sendsms, loadalluser, token, loadcurrentuser })(
  Sendmessages
)
