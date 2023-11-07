import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersornForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

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
      number: newPhoneNumber
    }

    if (persons.some(person => person.name === newPerson.name)) {
      return alert(`${newName} is already added to the phonebook.`)
    }

    personsService.create(newPerson)
      .then(person => {
        setPersons([...persons, person])
        setNewName('')
        setNewPhoneNumber('')
      })

  }

  const removePerson = person => {
    if (confirm(`Are you sure you want to delete ${person.name}`)) {
      personsService.remove(person.id).then(_ => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} changeFilterName={changeFilterName}/>

      <h3>Add new person</h3>
      <PersornForm newName={newName} newPhoneNumber={newPhoneNumber} addPerson={addPerson} changeName={changeName} changePhoneNumber={changePhoneNumber}/>

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(filterName))} removePerson={removePerson}/>
    </div>
  )
}

export default App
