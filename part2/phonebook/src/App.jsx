import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersornForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState({message: null, severity: 'info'})

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

  const showNotification = ({message, severity}) => {
    setNotification({message, severity})

    setTimeout(() => {
      setNotification({message: null, severity: 'info'})
    }, 3000)
  }

  const handleDeletedPerson = (person) => {
    setPersons(persons.filter(p => p.id !== person.id))
    showNotification({message: `Information of ${person.name} has already been removed from the server.`, severity: 'error'})
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

    const dupePerson = persons.find(person => person.name === newPerson.name)
    if (dupePerson) {
      if (!confirm(`${dupePerson.name} is already added to phonebook, replace old number with new one?`)) return

      personsService.update({...dupePerson, number: newPhoneNumber})
        .then(updatedPerson => {
          setPersons(persons.map(p => {
            if (p.id === updatedPerson.id) return {...p, number: updatedPerson.number}
            return p
          }))
          setNewName('')
          setNewPhoneNumber('')
          showNotification({message: `Updated ${updatedPerson.name} number`, severity: 'info'})
        })
        .catch(error => handleDeletedPerson(dupePerson))
      return
    }

    personsService.create(newPerson)
      .then(person => {
        setPersons([...persons, person])
        setNewName('')
        setNewPhoneNumber('')
        showNotification({message: `Added ${person.name} number`, severity: 'info'})
      })
  }

  const removePerson = person => {
    if (confirm(`Are you sure you want to delete ${person.name}`)) {
      personsService.remove(person.id)
        .then(_ => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification({message: `Removed ${person.name} from the phonebook.`, severity: 'info'})
        })
        .catch(error => handleDeletedPerson(person))
    }
  }


  return (
    <div>
      <Notification notification={notification}/>
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
