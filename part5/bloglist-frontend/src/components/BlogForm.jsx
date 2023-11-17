import blogsService from "../services/blogs"

const BlogForm = ({blogTitle, blogAuthor, blogUrl, setBlogTitle, setBlogAuthor, setBlogUrl, setBlogs}) => {
  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogsService.create({title: blogTitle, author: blogAuthor, url: blogUrl})
      setBlogs(blogs => blogs.concat(newBlog))
    }
    catch(exception) {
      console.error(exception)
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
