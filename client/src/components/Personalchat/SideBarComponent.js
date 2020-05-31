import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { Link } from "react-router-dom"

const SideBarComponent = ({
  users,
  filteredUsers,
  setPeerName,
  setPeerId,
  setWelcomeDisplay,
  welcomeDisplay,
}) => {
  return (
    <ScrollToBottom
      className={`${welcomeDisplay ? "sideBarBox3" : "sideBarBox2"}`}
    >
      {users &&
        filteredUsers.map((data) => (
          <div key={data._id}>
            <Link to={`/privatechat?name=${data.name}&id=${data._id}`}>
              <button
                onClick={(event) => {
                  setPeerName(data.name)
                  setPeerId(data._id)
                  setWelcomeDisplay(false)
                }}
                className='mappedListOfUsers'
              >
                {data.name}
              </button>
            </Link>
          </div>
        ))}
    </ScrollToBottom>
  )
}

export default SideBarComponent
