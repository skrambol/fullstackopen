const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const {initialBlogs, blogsInDb} = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('gets all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog/s have "id" property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('creates new blog', async () => {
    const newBlog = {title: "newest title", author: "O. Thor", url: "http://example.org/newest-title", likes: 2}
    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.statusCode).toBe(201)

    const allBlogs = await blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })

  test('if "likes" is missing, default to 0', async () => {
    const newBlog = {title: "newest title", author: "O. Thor", url: "http://example.org/newest-title"}
    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.statusCode).toBe(201)
    expect(response.body.likes).toBe(0)

    const allBlogs = await blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length + 1)
  })

  test('if "title" or "url" is missing, status code = 400', async () => {
    const newBlog = { author: "O. Thor"}
    expect(newBlog.title).toBeUndefined()
    expect(newBlog.url).toBeUndefined()

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.statusCode).toBe(400)

    const allBlogs = await blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length)
  })
})

describe("DELETE /api/blogs/:id", () => {
  test('deletes successfully', async () => {
    const allBlogs = await blogsInDb()
    const id = allBlogs[0].id
    const response = await api.delete(`/api/blogs/${id}`)

    expect(response.statusCode).toBe(204)

    const updatedBlogs = await blogsInDb()
    expect(updatedBlogs).toHaveLength(initialBlogs.length - 1)
  })

  test('deletes nothing if id is incorrect', async () => {
    const id = "000000000000000000000000"
    const response = await api.delete(`/api/blogs/${id}`)

    expect(response.statusCode).toBe(204)

    const allBlogs = await blogsInDb()
    expect(allBlogs).toHaveLength(initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
