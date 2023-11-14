const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {initialBlogs, blogsInDb} = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  const promisedBlogs = initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(promisedBlogs)
})

describe('/api/blogs', () => {
  test('GET gets all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('GET blogs have "id" property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('POST creates new blog', async () => {
    const newBlog = {title: "newest title", author: "O. Thor", url: "http://example.org/newest-title", likes: 2}
    const response = await api.post('/api/blogs', newBlog)

    const allBlogs = await blogsInDb()
    expect(response.statusCode).toBe(201)
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
