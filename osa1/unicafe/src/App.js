import React, { useState } from 'react'

const StatisticLine = (props) => {
return(
  <>
      <tr>
        <td style={{width: '60px'}}>{props.text}</td><td>{props.value}</td>
      </tr>
  </>
)
}

const Statistics = ({good, neutral, bad}) => {
  // No feedback given
  if (good+neutral+bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given!
      </div>
    )
  }
  //Statistics
  return(
  <div>
    <h1>Statistics</h1>
    <table style={{textalign:'left'}}>
    <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={good + neutral + bad}/>
    <StatisticLine text="average" value={(good-bad)/(good + neutral + bad)}/>
    <StatisticLine text="positive" value={good*100/(good + neutral + bad) + ' %'}/>
    </tbody>
    </table>
  </div>
  )
}

const Button = (props) => {
  return(
<button onClick={props.handleClick}> {props.text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick = {() => setGood(good+1)} text="good" />
      <Button handleClick = {() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick = {() => setBad(bad+1)} text="bad" />


      <Statistics good={good} neutral={neutral} bad={bad}/>



    </div>
  )
}

export default App
