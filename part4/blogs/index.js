const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const {MONGODB_URI, PORT} = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('connecting to', MONGODB_URI)
  })
.catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
