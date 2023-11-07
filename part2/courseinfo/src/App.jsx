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

const Course = ({courses}) => {
  return (
    courses.map(course =>
      <div key={course.id}>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total sum={course.parts.reduce((sum, p) => sum + p.exercises, 0)} />
      </div>
    )
  )
}

const App = () => {
  const course = [
    {
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
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          id: 1,
          name: 'Routing',
          exercises: 3
        },
        {
          id: 2,
          name: 'Middlewares',
          exercises: 7
        },
      ]
    },
  ]

  return (
    <div>
      <Course courses={course} />
    </div>
  )
}



export default App
