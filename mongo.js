const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.vfpzf.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  number: { type: String },
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNumber,
})


if (newName != null && newNumber != null) {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

