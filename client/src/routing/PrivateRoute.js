import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      // true &&  false

      !isAuthenticated ? <Redirect to='/Login' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps)(PrivateRoute)
