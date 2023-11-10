if (process.argv.length < 3) {
  return console.error("incorrect number of args. node mongodb.js <password> [<name> <number>]")
}

const password = process.argv[2]
const mongoose = require('mongoose')

const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.xcorlvl.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find().then(result => {
    console.log("phonebook:")
    result.forEach(r => console.log(r.name, r.number))
    mongoose.connection.close()
  })
}

else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const p = new Person({name, number})
  p.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook.`)
    mongoose.connection.close()
  })
}
