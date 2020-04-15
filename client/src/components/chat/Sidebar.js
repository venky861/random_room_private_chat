import React from "react"

const Sidebar = ({ users, room }) => {
  const List = () => {
    if (typeof users === "object") {
      return users.map((data) => <div key={data.id}>{data.name}</div>)
    }
  }

  const usersList = List()

  return (
    <div>
      <div className='text-dark ml-1'>Room Name:</div>
      <h4 className='text-danger ml-1 pl-1'>{room}</h4>

      <div className='mt-3 pt-4'>
        <div className='text-dark ml-1 '>User's Connected</div>
        <ul className='navbarul'>
          <li className='pl-2 mt-1 h4 text-danger'>{usersList}</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
