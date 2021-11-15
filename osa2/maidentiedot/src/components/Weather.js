import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          setWeather(response.data)
          console.log(1213, response.data)
          setLoading(false)
        })
    }, [capital, api_key])
  
  if (isLoading) {
    return (<> Loading...</>)
  }
  
  return (
    <> Weather in {capital} <br/>
    {console.log(weather.current.temperature)}
  
  Temperature: {weather.current.temperature} <code>&#176;</code>C<br/> 
  <img src={weather.current.weather_icons} alt='weather_icon' />
    </>
  )
  }

  export default Weather