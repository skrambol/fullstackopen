import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersornForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons([...persons, response.data])
        setNewName('')
        setNewPhoneNumber('')
      })

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
