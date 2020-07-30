const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('anna salasana argumenttina')
  process.exit(1)
}

const password = process.argv[2]

//const name = process.argv[3]

//const number = process.argv[4]

//const id = Math.floor(Math.random() * 10000)

const url =
    `mongodb+srv://jkseppal:${password}@cluster0.uhasy.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = (process.argv[3])
  const number = (process.argv[4])
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

/*const person = new Person({
    name: 'Juha',
    number: '88'
})
person.save().then(response => {
    console.log('lisätty!')
    mongoose.connection.close()
})*/

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}