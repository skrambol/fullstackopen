import { useState } from "react"

const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonLabel = visibility ? "hide" : "show"
  const detailsVisibility = {display: visibility ? "" : "none"}

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
      <div style={detailsVisibility}>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button>like</button>
        </p>
      </div>
    </div>
  )
}

export default Blog
