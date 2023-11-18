import PropTypes from 'prop-types'

import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('user', JSON.stringify(user))
    }
    catch (exception) {
      showNotification({
        message: 'An error occurred. Please check your username or password and try again.',
        severity: 'error',
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>
          username: {' '}
          <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} required/>
        </label>
        <br/>
        <label htmlFor='password'>
          password: {' '}
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} required/>
        </label>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
}

export default LoginForm
