const express = require('express')

const app = express()
app.use(express.json())
let phonebook = [
  {
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.post('/api/persons', (req, res) => {
  const {name, number} = req.body

  if (!name) {
    return res.status(400).json({error: 'name is missing'})
  }

  if (!number) {
    return res.status(400).json({error: 'number is missing'})
  }

  const person = phonebook.find(p => p.name === name)
  if (person) {
    return res.status(400).json({error: `'${name}' already exists. name must be unique`})
  }

  const id = Math.floor(Math.random() * 1000)
  const newPerson = {id, name, number}

  phonebook = phonebook.concat(newPerson)
  return res.json(newPerson)
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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`server is now running at port ${PORT}`)
})
