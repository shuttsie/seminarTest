import React from 'react'
import { Link } from 'gatsby'
import { getCurrentUser } from '../utils/auth'

const Details = () => {
  const user = getCurrentUser()
  console.log('user:', user)
  return (
    <div>
      <h1>Profile Details</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Bank Name: {user.given_name}</p>
      <p>Bank Title/Role: {user.nickname}</p>
      <p>City: {user.address}</p>
      <p>State: {user.locale}</p>
      <p>Seminar Dates: {user.middle_name}</p>
      <p>ID: {user.sub}</p>

      <Link to="/app/home">Home</Link>
    </div>
  )
}

export default Details
