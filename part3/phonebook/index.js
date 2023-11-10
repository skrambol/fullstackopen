const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/persons')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

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

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = phonebook.find(p => p.id === id)

  if (person) {
    return res.json(person)
  }

  return res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  phonebook = phonebook.filter(p => p.id !== id)

  return res.status(204).end()
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${new Date()}</p>`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server is now running at port ${PORT}`)
})
