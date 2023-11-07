const Persons = ({persons, removePerson}) => {
  return (
    <div>
      {
        persons
        .map(person => {
          return (
            <p key={person.id}>
              {person.name} -- {person.number}
              <button onClick={() => removePerson(person)}>delete</button>
            </p>
          )
        })
      }
    </div>
  )
}

export default Persons
