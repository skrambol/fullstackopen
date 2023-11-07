import { useEffect, useState } from "react"
import weatherService from "../services/weather"
import Weather from "./Weather"

const Countries = ({countries, show}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }

  if (countries.length > 1) {
    return (
      <div>
        {
          countries.map(country => {
            return (
              <p key={country.flag}>
                {country.name.common} <button onClick={() => show(country.name.common)}>show</button>
              </p>
            )
          })
        }
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages
    const [latitude, longitude] = country.capitalInfo.latlng
    const [weather, setWeather] = useState({})

    useEffect(() => {
      weatherService.getWeather(latitude, longitude).then(newWeather => {
        setWeather(newWeather)
      })
    }, [])

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

        <h3>Weather in {country.capital[0]}</h3>
        <Weather weather={weather} />
      </div>
    )
  }

  return (
    <p>No country matches the filter.</p>
  )
}

export default Countries
