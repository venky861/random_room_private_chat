import React, { useState } from "react"
import { Link } from "react-router-dom"
import { nameValidate } from "../../utils/validate"
import { withRouter } from "react-router-dom"
const JoinRandomChat = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
  })

  const [err, setErr] = useState([])

  const { name } = formData
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
    const errors = nameValidate(name)
    if (errors.length > 0) {
      setErr(errors)
      setTimeout(() => {
        setErr([])
      }, 3000)
    } else {
      history.push(`/Randomchat?name=${name}`)
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
            <h4 className=' text-center chat-heading mt-2'> Random Chat </h4>
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

              <button className='btn btn-secondary form-control' type='submit'>
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(JoinRandomChat)
