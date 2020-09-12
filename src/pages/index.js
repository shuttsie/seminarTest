import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_Av86Avjuu',
    userPoolWebClientId: '3s5g79k9gnnk1m506cllemc5cg',
  },
})

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>
      Welcome to your new Gatsby site with multi-user authentication powered by{' '}
      <a href="https://amplify.aws">AWS Amplify</a>
    </p>
    <p>
      Create a new account: <Link to="/app/signup">Sign Up</Link>
    </p>
    <Link to="/app/login">Sign In</Link>
    <br />
    <Link to="/app/home">Home</Link>
    <br />
    <Link to="/app/profile">Your profile</Link>
  </Layout>
)

export default IndexPage
