import { useEffect, useState } from "react"
import countriesService from "./services/countries"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const filteredCountries = countries.filter(c => {
    const normalizedSearch = search.toLowerCase()

    return c.name.common.toLowerCase().includes(normalizedSearch) || c.name.official.toLowerCase().includes(normalizedSearch)
  })

  useEffect(() => {
    countriesService.getAll().then(c => {
      setCountries(c)
      document.querySelector("#search").disabled = false
      document.querySelector("#search").placeholder = ""
    })
  }, [])

  const show = country => {
    setSearch(country)
  }

  return (
    <div>
      <p>
        find countries
        <input id="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="fetching countries..." disabled/>
      </p>
      <Countries countries={filteredCountries} show={show}/>
    </div>

  )
}

export default App
