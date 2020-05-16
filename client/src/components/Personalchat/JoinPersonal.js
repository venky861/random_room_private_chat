import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { loadcurrentuser, privatemsg } from "../../actions/auth"
import setAuthToken from "../../utils/setAuthToken"

const JoinPersonal = ({
  auth: { users },
  loadcurrentuser,
  privatemsg,
  adminuser,
}) => {
  console.log(adminuser)
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      loadcurrentuser()
      privatemsg()
    }
  }, [loadcurrentuser, privatemsg])

  const filteredUsers = users && users.filter((user) => user._id !== adminuser)

  return (
    <div>
      {users &&
        filteredUsers.map((data) => (
          <div key={data._id}>
            <Link to={`/privatechat?name=${data.name}&id=${data._id}`}>
              <button>{data.name}</button>
            </Link>
          </div>
        ))}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  adminuser: state.currentUser.user._id,
})

export default connect(mapStateToProps, { loadcurrentuser, privatemsg })(
  JoinPersonal
)
