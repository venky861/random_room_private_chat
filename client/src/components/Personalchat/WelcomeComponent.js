import React from "react"

const WelcomeComponent = ({ adminName }) => {
  return (
    <div>
      <div className='welcomeGrid'>
        <div className='welcomeBox1'>
          <p className='mt-3'>
            {" "}
            <span className='ml-3 h2 welcomePrivateHeading'>
              {" "}
              Welcome <span className='font-weight-bold'>{adminName}</span>{" "}
              among us!{" "}
            </span>
            <p className='ml-3 mt-2'>
              This is the best place to find new people around you & make new
              friendships!
            </p>
          </p>
          <div className='welcomeUIList'>
            <ul className='welcomeUIListultag'>
              <li>Please feel free to chat</li>
              <li>
                Start chatting by choosing a person from the list & say Hi!
              </li>
              <li>Well, Enjoy your time! </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeComponent
