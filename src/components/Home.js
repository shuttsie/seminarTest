import React from 'react'
import { Link } from 'gatsby'

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>
      You are now logged in! <Link to="/app/profile">View profile</Link>
    </p>
    <p>
      <Link to="/app/notes">Take Notes</Link>
      <Link to="/app/chat">Chat</Link>
    </p>
    <p>
      Now go build something great and deploy it using the{' '}
      <a href="https://console.amplify.aws">AWS Amplify Console</a>
    </p>
  </div>
)

export default Home
