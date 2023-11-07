const Persons = ({persons}) => {
  return (
    <div>
      {
        persons
        .map(person => <p key={person.name}>{person.name} -- {person.phoneNumber}</p>)
      }
    </div>
  )
}

export default Persons
