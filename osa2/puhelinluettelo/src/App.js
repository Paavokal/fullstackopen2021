import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({value, onChange}) => {
  return(
      <div>
      Filter shown with <input value={value} onChange={onChange}/>
      {console.log(value)}
      </div>
  )
}

const PersonForm = ({onSubmit,newName,nameChange,newNumber,numberChange}) => {
  return(
    <form onSubmit={onSubmit}>
        <div>
          name:
          <input 
            value={newName}
            onChange={nameChange}         
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={numberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({contactsToShow}) => {
  return (
    <table>
    <tbody> 
   {contactsToShow.map(person => 
    <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>
     )}
     </tbody>
   </table>

  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchString, setSearchString ] = useState('')
  const [ showAll, setShowAll ] = useState (true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

 
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if(persons.some(e => e.name === newName)){
      alert(`${newName} is already on phonebook!`)
    }
    else {
    setPersons(persons.concat(contactObject))
    setNewName('')
    setNewNumber('')
    }
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
      <h2>Phonebook</h2>
      <Filter value={searchString} onChange={handleFilterChange}/>

      <h2>Add New </h2>
      <PersonForm onSubmit={addContact} newName={newName} nameChange={handleNameChange} newNumber={newNumber} numberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons contactsToShow={contactsToShow} />

    </div>
    
  )

}

export default App
