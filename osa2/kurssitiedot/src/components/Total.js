import React from "react"

const Total = ({course}) => {
    
    const total = course.parts.reduce((s,p) => s + p.exercises, 0)
    return (
      <div> 
        <b>Total of {total} exercises. </b>
      </div>
    )
  }

export default Total