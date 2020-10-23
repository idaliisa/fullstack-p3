const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))




let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id:2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id:3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id:4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}<p></p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person=> person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const newId = persons.length > 0
      ? Math.floor(Math.random() * 10000000000000)
      : 0
    return newId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }

    const existingName = persons.find(person => person.name === body.name)
    if (existingName) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })