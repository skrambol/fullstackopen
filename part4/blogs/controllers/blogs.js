const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const newBlog = await blog.save()

  response.status(201).json(newBlog)
})

router.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

module.exports = router
