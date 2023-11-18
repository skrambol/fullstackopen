import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const getAll = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }

    getAll()
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('user'))
    setUser(localUser)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
  }

  const handleLike = async ({id, author, title, likes}) => {
    try {
      const response = await blogService.like({id, likes})

      setBlogs(allBlogs => {
        const updatedBlog = allBlogs.find(blog => blog.id === id)
        updatedBlog.likes = response.likes

        return allBlogs
      })
      showNotification({message: `You liked "${title}" by "${author}".`, severity:"info"})

    }
    catch(exception) {
      showNotification({
        message: 'An error occurred. Please try again later.',
        severity: 'error',
      })
    }
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
      <Togglable buttonLabel={"new note"}>
        <BlogForm
          setBlogs={setBlogs}
          showNotification={showNotification}
        />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
        )}
      </div>
    </div>
  )
}

export default App
