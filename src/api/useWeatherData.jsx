import { useState, useEffect } from 'react'

const useWeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data?.name) {
          const transformedData = {
            feelsLike: data.main?.feels_like,
            sunsetTime: data?.sys?.sunset,
            sunriseTime: data?.sys?.sunrise,
            temperature: data.main?.temp,
            weatherType: data.weather?.[0]?.main,
            weatherIcon: data.weather?.[0]?.icon,
          }
          setWeatherData(transformedData)
        }
        else {
          setWeatherData(null)
        }
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [city, url]);

  return { weatherData, loading, error }
}

export default useWeatherData

