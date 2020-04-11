import React from "react"
import Sendmessages from "./components/Sendmessages"
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing}></Route>
      <Switch>
        <Route exact path='/messages' component={Sendmessages}></Route>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/Login' component={Login}></Route>
        <Route exact path='/dashboard' component={Sendmessages}></Route>
      </Switch>
    </Router>
  )
}

export default App
