import React, { useState, useEffect } from 'react'
import contactService from './services/contactsService.js'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')
  const [ showAll, setShowAll ] = useState (true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationStyle, setNotificationStyle] = useState('basic')

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

 
  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
      name: newName,
      number: newNumber
    }

    const personChange = persons.some(e => e.name === newName)
    const currentPerson = persons.find(e => e.name === newName)
    const newPersonNumber = {...currentPerson, number: newNumber}
    console.log(currentPerson, newPersonNumber)

    if(personChange)
    {
      window.confirm(`${newName} is already added to phonebook! Replace the old number with a new one?`) &&
        contactService
          .update(currentPerson.id ,newPersonNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== currentPerson.id ? person : returnedPerson))         
            setNewName('')
            setNewNumber('')
            //notification
            setNotificationStyle('basic')
            setErrorMessage(`${contactObject.name} number changed!`)
            setTimeout(()=> {
             setErrorMessage(null)
            },2000)
          })
          //error notification
          .catch(error => {
            setNotificationStyle('error')
            setErrorMessage(`Person ${currentPerson.name} was already deleted from server`)
            setTimeout(()=> {
              setErrorMessage(null)
            },2000) 
            const newPersons = persons.filter((item) => item.id !== currentPerson.id)
            setPersons(newPersons)       
          })
    }
    else {
      contactService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          //notification
          setNotificationStyle('basic')
          setErrorMessage(`Added ${contactObject.name}`)
          setTimeout(()=> {
            setErrorMessage(null)
          },2000)
        })
        .catch(error => {
          setNotificationStyle('error')
          setErrorMessage(error.response.data.error)
          setTimeout(()=> {
            setErrorMessage(null)
          },2000)
        })
    }
  }
  const deletePerson = (id, name) => {
    window.confirm(`Delete ${name}?`) &&
      contactService
        .remove(id)
        .then(() => {
          const newPersons = persons.filter((item) => item.id !== id)
          setPersons(newPersons)
          //notification
          setNotificationStyle('basic')
          setErrorMessage(`${name} deleted!`)
          setTimeout(()=> {
            setErrorMessage(null)
          },2000)        
        })
        .catch(error => {
          setNotificationStyle('error')
          setErrorMessage(`Person ${name} was already deleted from server`)
          setTimeout(()=> {
            setErrorMessage(null)
          },2000)
          const newPersons = persons.filter((item) => item.id !== id)
          setPersons(newPersons)
        })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setSearchString(event.target.value)
    if(event.target.value !== '') {
      setShowAll(false)
    }
    else {
      setShowAll(true)
    }
  }

  console.log(showAll, searchString)

  const contactsToShow = showAll
  ? persons
  : persons.filter(x => x.name.toLowerCase().includes(searchString.toLowerCase()))

  return (

    <div>
      <Notification message={errorMessage} style={notificationStyle}/>
      <h2>Phonebook</h2>
      <Filter value={searchString} onChange={handleFilterChange}/>

      <h2>Add New </h2>
      <PersonForm onSubmit={addContact} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} deletePerson={deletePerson}/>

    </div>
    
  )

}

export default App
