import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('user'))
    setUser(localUser)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  const showNotification = ({message, severity}) => {
    setNotification({message, severity})
    setTimeout(() => {
      setNotification(n => null)
    }, 3000)
  }

  if (!user) {
    return (
      <div>
        <h2>login form</h2>
        <Notification notification={notification}/>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          showNotification={showNotification}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification}/>
      <p>
        {user.name} is logged in.
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor}
        setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl}
        setBlogUrl={setBlogUrl}
        setBlogs={setBlogs}
        showNotification={showNotification}
      />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
