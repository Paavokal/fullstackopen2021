import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const Filter = ({value, onChange}) => {
  return(
      <div>
      Find countries: <input value={value} onChange={onChange}/>
      </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ searchString, setSearchString ] = useState('')
  const [ showAll, setShowAll ] = useState (true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')


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

  const handleButtonClick = (name) => {
  setSearchString(name)
  }

  console.log(showAll, searchString)

  const countriesToShow = showAll
  ? countries
  : countries.filter(x => x.name.common.toLowerCase().includes(searchString.toLowerCase()))


return (
    <div>
        <Filter value={searchString} onChange={handleFilterChange}/>
        <Countries countries={countriesToShow} handleClick={handleButtonClick}/>
        
    </div>
)
}

export default App