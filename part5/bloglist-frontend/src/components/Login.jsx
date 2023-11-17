import loginService from "../services/login"

const Login = ({username, password, setUsername, setPassword, setUser}) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
      // setlocalstorage
    }
    catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>
          username: {" "}
          <input type='text' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
        </label>
        <br/>
        <label htmlFor='password'>
          password: {" "}
          <input type='password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
