const router = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

router.post('/', async (request, response) => {
  const {username, name, password} = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userObject = new User({username, name, passwordHash})
  const newUser = await userObject.save()

  response.status(201).json(newUser)

})

module.exports = router
