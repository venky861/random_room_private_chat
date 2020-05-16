import React from "react"

const Sidebar = ({ users, room }) => {
  const List = () => {
    if (typeof users === "object") {
      return users.map((data) => <li key={data.id}>{data.name}</li>)
    }
  }

  const usersList = List()

  return (
    <div>
      <div className='text-dark ml-1'>Room Name:</div>
      <h4 className='text-danger ml-1 pl-1'>{room}</h4>

      <div className='mt-3 pt-4'>
        <div className='text-dark ml-1 '>User's Connected</div>
        <ul className=''>
          <h5 className='mt-1 text-danger'>{usersList}</h5>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
