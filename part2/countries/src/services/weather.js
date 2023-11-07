import axios from "axios"

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const getWeather = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
  const request = axios.get(url)

  return request.then(response => response.data)
}


export default {
  getWeather
}
