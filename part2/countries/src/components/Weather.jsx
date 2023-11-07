const Weather = ({weather}) => {
  if (Object.keys(weather).length === 0) return null

  return (
    <div>
      <p>temperature {(weather.main.temp - 273.15).toFixed(2)} °C</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
