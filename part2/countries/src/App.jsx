import { useEffect, useState } from "react"
import countriesService from "./services/countries"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(search) || c.name.official.toLowerCase().includes(search))

  useEffect(() => {
    countriesService.getAll().then(c => {
      setCountries(c)
      document.querySelector("#search").disabled = false
    })
  }, [])

  return (
    <div>
      <p>
        find countries
        <input id="search" value={search} onChange={e => setSearch(e.target.value)} disabled/>
      </p>
      <Countries countries={filteredCountries}/>
    </div>

  )
}

export default App
