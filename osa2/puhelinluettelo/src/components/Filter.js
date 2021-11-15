import React from 'react'
const Filter = ({value, onChange}) => {
    return(
        <div>
        Filter shown with <input value={value} onChange={onChange}/>
        {console.log(value)}
        </div>
    )
  }
  export default Filter