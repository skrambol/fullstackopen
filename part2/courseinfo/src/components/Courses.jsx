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

const Courses = ({courses}) => {
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

export default Courses
