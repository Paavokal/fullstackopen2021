import React, { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Display = (props) => {
  return(
    <div>
      <h2>Most voted anectode:</h2>({props.mostVotes}) {props.anecdotes[props.mostVotes]}
    </div>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes]  = useState(Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleVote = () => {
    const vote = [...votes]
    vote[selected] += 1
    setVotes(vote)
    setMostVotes(vote.indexOf(Math.max.apply(null,vote)))
  }
  const handleRandom = () => {
    const randomNumb = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumb)
  }

  return (
    <div>
      {anecdotes[selected]}<br/>
      <Button handleClick= {handleVote} text='Vote'/>
      <Button handleClick= {handleRandom} text='next anecdote'/><br/>
      <Display mostVotes={mostVotes} anecdotes={anecdotes}/>

      
      {console.log(selected)}
      {console.log(votes)}
      {console.log(votes.indexOf(Math.max.apply(null,votes)))}


    </div>
    
  )
}

export default App
