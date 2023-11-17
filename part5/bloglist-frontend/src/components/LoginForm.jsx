import loginService from "../services/login"

const LoginForm = ({username, password, setUsername, setPassword, setUser, showNotification}) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
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
          username: {" "}
          <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)} required/>
        </label>
        <br/>
        <label htmlFor='password'>
          password: {" "}
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} required/>
        </label>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
