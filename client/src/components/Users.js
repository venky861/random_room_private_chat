import React from "react"
import { connect } from "react-redux"

const Users = ({ allusers }) => {
  console.log("all users", allusers)

  return (
    <div>
      <h4>users</h4>
    </div>
  )
}

const mapStateToProps = (state) => ({
  allusers: state.auth.user,
})

export default connect(mapStateToProps)(Users)
