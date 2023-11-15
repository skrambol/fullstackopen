const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const {usersInDb} = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)
const baseUrl = '/api/users'


beforeEach(async () => {
  await User.deleteMany({})

  const newUser = new User(
    {
      username: "root",
      name: "root name",
      passwordHash: await bcrypt.hash("password", 10),
    })

  await newUser.save()
})

describe(`GET ${baseUrl}`, () => {
  test('gets all users', async () => {
    const response = await api.get(baseUrl)

    expect(response.body).toHaveLength(1)
  })
})

describe(`POST ${baseUrl}`, () => {
  test('registers a user', async () => {
    const newUser = {username: "username", name: "name", password: "password"}
    const response = await api.post(baseUrl).send(newUser)

    expect(response.statusCode).toBe(201)

    const users = await usersInDb()
    expect(users).toHaveLength(2)
    expect(users[users.length-1].username).toBe(newUser.username)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
