import React, { useState } from "react"
import { Link } from "react-router-dom"
const Join = () => {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
  })

  const { name, room } = formData
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
  return (
    <div className='container'>
      <div>Chat</div>

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
      <Link to={`/socket?name=${name}&room=${room}`}>
        <button type='submit'>submit</button>
      </Link>
    </div>
  )
}

export default Join
