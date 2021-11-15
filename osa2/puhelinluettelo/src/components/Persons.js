import React from 'react'

const Persons = ({contactsToShow, deletePerson}) => {
    return (
      <table>
      <tbody> 
     {contactsToShow.map(person => 
      <tr key={person.name}>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick ={() => deletePerson(person.id, person.name)}>delete</button></td>
      </tr>
       )}
       </tbody>
     </table>
  
    )
  }

export default Persons