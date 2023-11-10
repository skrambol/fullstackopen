const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/persons')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({error: 'malformatted id'})
  }

  next(err)
}

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook = []


app.get('/api/persons', (req, res) => {
  Person.find().then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body

  if (!name) {
    return res.status(400).json({error: 'name is missing'})
  }

  if (!number) {
    return res.status(400).json({error: 'number is missing'})
  }

  // to be refactored?
  // const person = phonebook.find(p => p.name === name)
  // if (person) {
  //   return res.status(400).json({error: `'${name}' already exists. name must be unique`})
  // }

  const newPerson = new Person({name, number})
  newPerson.save().then(result => {
    return res.json(result)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }

      return res.json(person)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const {id, name, number} = req.body

  Person.findByIdAndUpdate(id, {id, name, number}, {new: true})
    .then(updatedPerson => {
      if (!updatedPerson) {
        return res.status(404).end()
      }

      return res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is now running at port ${PORT}`)
})
