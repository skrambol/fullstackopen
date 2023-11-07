const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part part={part} key={part.id}/>)}
  </>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={course.parts.reduce((sum, p) => sum + p.exercises, 0)} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      },
      {
        id: 4,
        name: 'Redux',
        exercises: 11
      }

    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}



export default App
