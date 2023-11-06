import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Display = ({text, counter}) => {
  return (
    <p>{text} {counter}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <Header text="give feedback"/>
        <Button text="good" onClick={() => {setGood(good + 1)}}/>
        <Button text="neutral" onClick={() => {setNeutral(neutral + 1)}}/>
        <Button text="bad" onClick={() => {setBad(bad + 1)}}/>
      </div>

      <div>
        <Header text="statistics"/>
        <Display text="good" counter={good}/>
        <Display text="neutral" counter={neutral}/>
        <Display text="bad" counter={bad}/>
      </div>
    </div>
  )
}

export default App
