import React, { useState } from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { nameAndRoomValidate } from "../../utils/validate"

const JoinRoomChat = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
  })

  const { name, room } = formData
  const [err, setErr] = useState([])
  /*
  const submitHandler = (event) => {
    event.preventDefault()
    console.log(name)
    console.log(room)
  }
  */
  const changeHandler = (event) => {
    event.preventDefault()
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    //  console.log(name)
    const errors = nameAndRoomValidate(name, room)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      history.push(`/roomchat?name=${name}&room=${room}`)
    }
  }

  const ListOfErrors =
    err.length > 0
      ? err.map((data, index) => {
          console.log(data)
          return <div key={index}>{data}</div>
        })
      : ""
  return (
    <div className='chat-top'>
      <div className='container'>
        <div className='col-md-6 m-auto'>
          <div className='card  card-body card-color'>
            <h4 className='text-center chat-heading mt-2'> Room Chat </h4>
            <h6 className='text-center chat-heading mt-2'> {ListOfErrors}</h6>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className='form-group'>
                <label className='text-dark'>Enter your Name: </label>
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  value={name}
                  onChange={(event) => changeHandler(event)}
                />
              </div>

              <div className='form-group'>
                <label className='text-dark'>Room to Connect: </label>
                <input
                  className='form-control'
                  type='text'
                  name='room'
                  value={room}
                  onChange={(event) => changeHandler(event)}
                />
              </div>

              <button
                className='btn btn-secondary text-center form-control'
                type='submit'
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(JoinRoomChat)
