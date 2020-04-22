import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { loadalluser, loadcurrentuser } from "../actions/auth"

const Users = ({ loadcurrentuser, loadalluser, allusers }) => {
  console.log("all users", allusers)
  useEffect(() => {
    //  loadcurrentuser()
    loadalluser()
  }, [])
  return (
    <div>
      <h4>users</h4>
    </div>
  )
}

const mapStateToProps = (state) => ({
  allusers: state.auth.user,
})

export default connect(mapStateToProps, { loadcurrentuser, loadalluser })(Users)
