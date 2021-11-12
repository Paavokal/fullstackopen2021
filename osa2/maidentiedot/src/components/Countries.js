import React from 'react'
import Weather from './Weather'

const Countries = ({countries, handleClick}) => {
    console.log(countries.length)
   
   //  Jos maita maita on alle 11 ja yli 1
     if (countries.length <= 10 && countries.length >1 ) {
     return (
   
       <table>
       <tbody> 
       {countries.map(country => 
         <tr key={country.name.common}><td>{country.name.common}<button onClick={() => handleClick(country.name.common)}> Show </button></td></tr>
         )}
       </tbody>
       </table>
       
     )
   }
   
   // Jos maita 1
   else if (countries.length === 1){
     return(
     <div>
         {countries.map((country, i) => 
         <div key={i}>
           <h2>{country.name.common}</h2>
           <p>
           Capital: {country.capital} <br/>
           Population: {country.population}<br/><br/>
           </p>
           Languages: {Object.values(country.languages).map((val,i) => <li key={i}> {val} </li>)}
           {console.log(country.flags)}
           <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="10%" height="10%" border="1"/><br/><br/>
   
           <Weather capital={country.capital}/>
           </div>
           
         )}
          
     </div>
     )
   }
   // jos yli 10 maata löytyy haulla
   else{
     return(
     <div>Too many matches, specify your filter</div>
     )
   }
   }
   export default Countries