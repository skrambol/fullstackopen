import blogsService from "../services/blogs"

const BlogForm = ({blogTitle, blogAuthor, blogUrl, setBlogTitle, setBlogAuthor, setBlogUrl, setBlogs, showNotification}) => {
  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogsService.create({title: blogTitle, author: blogAuthor, url: blogUrl})
      showNotification({
        message: `Added "${blogTitle}" by "${blogAuthor}".`,
        severity: 'info',
      })
      setBlogs(blogs => blogs.concat(newBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    }
    catch(exception) {
      showNotification({
        message: 'An error occurred. Please try again later.',
        severity: 'error',
      })
    }
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreate}>
        <label>
          title: {" "}
          <input type='text' value={blogTitle} onChange={e => setBlogTitle(e.target.value)} required/>
        </label>
        <br/>
        <label>
          author: {" "}
          <input type='text' value={blogAuthor} onChange={e => setBlogAuthor(e.target.value)} required/>
        </label>
        <br/>
        <label>
          url: {" "}
          <input type='url' value={blogUrl} onChange={e => setBlogUrl(e.target.value)} required/>
        </label>
        <br/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
