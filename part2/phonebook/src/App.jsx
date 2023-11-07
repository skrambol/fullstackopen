import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-1234567' },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changePhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const changeFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      phoneNumber: newPhoneNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      return alert(`${newName} is already added to the phonebook.`)
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter by name: <input value={filterName} onChange={changeFilterName}/>
      <form onSubmit={addPerson}>
        <h2>Add new person</h2>
        <div>
          name: <input value={newName} onChange={changeName}/>
        </div>
        <div>
          phone number: <input value={newPhoneNumber} onChange={changePhoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons
          .filter(person => person.name.toLowerCase().includes(filterName))
          .map(person => <p key={person.name}>{person.name} -- {person.phoneNumber}</p>)
        }
      </div>
    </div>
  )
}

export default App
