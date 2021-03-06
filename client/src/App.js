import React from "react"
import Sendmessages from "./components/Sendmessages"
import Navbar from "./components/Navbar"
import Landing from "./components/Landing"
import Register from "./components/Register"
import Login from "./components/Login"
import Alert from "./components/Alert"

import PrivateRoute from "./routing/PrivateRoute"
import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import Chat from "./components/Chat"

import JoinRoomChat from "./components/Roomchat/JoinRoomChat"
import SocketPractice from "./components/Roomchat/SocketPractice"

import PersonalChat from "./components/Personalchat/PersonalChat"

import JoinRandomChat from "./components/Randomchat/JoinRandomChat"
import SocketPracticeRandom from "./components/Randomchat/SocketPracticeRandom"
import EditProfile from "./components/EditProfile"

const App = () => {
  return (
    <Router>
      <Navbar />

      <div className='socketPractice'>
        <Alert className='container'></Alert>
        <Route exact path='/' component={Landing}></Route>

        <Switch>
          <Route exact path='/messages' component={Sendmessages}></Route>
          <Route exact path='/register' component={Register}></Route>
          <Route exact path='/Login' component={Login}></Route>

          <Route path='/joinroom' component={JoinRoomChat}></Route>
          <Route path='/roomchat' component={SocketPractice}></Route>

          <Route path='/joinrandom' component={JoinRandomChat}></Route>
          <Route path='/Randomchat' component={SocketPracticeRandom}></Route>

          <PrivateRoute
            path='/privatechat'
            component={PersonalChat}
          ></PrivateRoute>

          <Route path='/chat' component={Chat}></Route>

          <Route path='/editprofile' component={EditProfile}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
