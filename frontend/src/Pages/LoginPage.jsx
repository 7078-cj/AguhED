import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

function Login() {

    let {loginUser} = useContext(AuthContext)
    const nav = useNavigate()

  return (
    <div>
        <form onSubmit={loginUser}>
            Username: <input type="text" name='username' />
            Password: <input type="password" name="password" id="" />
            <input type="submit" />
        </form>
        
    </div>
  )
}

export default Login