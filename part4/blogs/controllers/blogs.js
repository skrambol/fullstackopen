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
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})

  if (updatedBlog) {
    response.json(updatedBlog)
  }
  else {
    response.status(404).end()
  }

})

module.exports = router
