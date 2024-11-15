import { useState, useEffect } from 'react'

const useWeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  const API_KEY = 'bbbf8dee2adfd7d13b5ce5d85143c91b'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const transformedData = {
          feelsLike: data.main?.feels_like,
          sunsetTime: data?.sys?.sunset,
          sunriseTime: data?.sys?.sunrise,
          temperature: data.main?.temp,
          weatherType: data.weather?.[0]?.main,
          weatherIcon: data.weather?.[0]?.icon,
        }
        setWeatherData(transformedData)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [city, url]);

  return { weatherData, loading, error }
}

export default useWeatherData

