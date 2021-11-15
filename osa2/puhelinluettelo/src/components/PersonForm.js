import React from 'react'

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

export default PersonForm