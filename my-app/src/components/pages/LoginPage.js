import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'

const LoginPage = () => {
  const {loginUser} = useContext(AuthContext)
  return (
    <div className="login-page">
        <header>
          <h1>Login Form</h1>
        </header>
        <form  onSubmit={loginUser} className="login-form">
            <input required type="text" placeholder="Enter a username" name="username"/>
            <input required type="password" name="password"/>
            <button type="submit">Submit</button>
        </form>
        <p>New user? Register here! <Link to="/register">Register</Link></p>
    </div>
  )
}

export default LoginPage