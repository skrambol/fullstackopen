const PersornForm = ({newName, newPhoneNumber, addPerson, changeName, changePhoneNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={changeName}/>
      </div>
      <div>
        phone number: <input value={newPhoneNumber} onChange={changePhoneNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersornForm
