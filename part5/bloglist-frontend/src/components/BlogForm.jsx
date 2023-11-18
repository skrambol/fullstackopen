import PropTypes from 'prop-types'

import { useState } from 'react'

const BlogForm = ({ createBlog, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      await createBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
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
          title: {' '}
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} required id="title"/>
        </label>
        <br/>
        <label>
          author: {' '}
          <input type='text' value={author} onChange={e => setAuthor(e.target.value)} required id="author"/>
        </label>
        <br/>
        <label>
          url: {' '}
          <input type='url' value={url} onChange={e => setUrl(e.target.value)} required id="url"/>
        </label>
        <br/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired
}

export default BlogForm
