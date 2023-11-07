import { useState } from 'react'
import Persons from './components/Persons'
import PersornForm from './components/PersonForm'
import Filter from './components/Filter'

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

    if (newName === "" || newPhoneNumber === "") {
      return alert('Name and Phone Number cannot be blank.')
    }

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
      <Filter filterName={filterName} changeFilterName={changeFilterName}/>

      <h3>Add new person</h3>
      <PersornForm newName={newName} newPhoneNumber={newPhoneNumber} addPerson={addPerson} changeName={changeName} changePhoneNumber={changePhoneNumber}/>

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(filterName))}/>
    </div>
  )
}

export default App
