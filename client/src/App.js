import React from "react"
import Sendmessages from "./components/Sendmessages"
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"
import Alert from "./components/Alert"
import setAuthToken from "./utils/setAuthToken"
import PrivateRoute from "./routing/PrivateRoute"
import New from "./components/New"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <Alert className='container'></Alert>
      <Route exact path='/' component={Landing}></Route>
      <Switch>
        <PrivateRoute
          exact
          path='/messages'
          component={Sendmessages}
        ></PrivateRoute>
        <PrivateRoute exact path='/new' component={New}></PrivateRoute>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/Login' component={Login}></Route>
      </Switch>
    </Router>
  )
}

export default App
