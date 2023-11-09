const Filter = ({filterName, changeFilterName}) => {
  return (
    <>
      filter by name: <input value={filterName} onChange={changeFilterName}/>
    </>
  )
}

export default Filter
