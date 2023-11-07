const Countries = ({countries}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => <p key={country.flag}>{country.name.common}</p>)}
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.keys(languages).map(acronym => <li key={acronym}>{languages[acronym]}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  }

  return (
    <p>No country matches the filter.</p>
  )
}

export default Countries
