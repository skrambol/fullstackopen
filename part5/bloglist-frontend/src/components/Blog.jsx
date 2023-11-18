import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemoveBlog }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? 'hide' : 'show'
  const detailsVisibility = { display: visibility ? '' : 'none' }

  const style = {
    border: '1px solid black',
    padding: '1em',
  }

  const toggleVisibility = () => {
    setVisibility(v => !v)
  }

  return (
    <div style={style}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={detailsVisibility} className='blog-details'>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>
          Added by: {blog.user.name}
        </p>
        <p>
          <button onClick={() => handleRemoveBlog(blog)}>delete</button>
        </p>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
}

export default Blog
