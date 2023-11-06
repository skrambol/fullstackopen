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

const Display = ({text, counter, unit=""}) => {
  return (
    <p>{text} {counter}{unit}</p>
  )
}

const StatisticsContent = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all) || 0
  const positive = (good / all) || 0

  if (all < 1) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Display text="good" counter={good}/>
      <Display text="neutral" counter={neutral}/>
      <Display text="bad" counter={bad}/>
      <Display text="all" counter={all}/>
      <Display text="average" counter={average}/>
      <Display text="positive" unit="%" counter={positive}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <Header text="statistics"/>
      <StatisticsContent good={good} neutral={neutral} bad={bad}/>
    </div>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App