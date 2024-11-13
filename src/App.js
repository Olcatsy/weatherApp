import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('Toronto')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dayOrNight, setDayOrNight] = useState('') // use for day/night theme

  const API_KEY = 'bbbf8dee2adfd7d13b5ce5d85143c91b'
  
  // move to api.js or customHook
  const fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    setLoading(true)
    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }

  const handleCityInput = (e) => setCity(e.target.value)

  const handleSearch = (e) => {
    e.preventDefault()
    fetchData()
  }

  // use for day/night theme
  const getDayOrNight = () => {
    const now = Date.now()
    const sunset = new Date(weatherData?.sys?.sunset * 1000)// convert to milliseconds
    const sunrise = new Date(weatherData?.sys?.sunrise * 1000)
    if (now <= sunrise || now >= sunset ) {
      setDayOrNight('night')
    } else if (now > sunrise && now < sunset) {
      setDayOrNight('day')
    } else {
      setDayOrNight('error')
    }
  }

  // fetch data on load
  useEffect(() => {
    fetchData()
    getDayOrNight()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Breezio</h1>
        {/* input form */}
        <form>
          <input
            type='text'
            value={city}
            onChange={(e) => handleCityInput(e)}
          />
          <button onClick={(e) => handleSearch(e)}>Search</button>
        </form>

        {/* display data here */}
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error{error}</p>}

          {weatherData && 
            <>
              <h2>{city}</h2>
              <p>{Math.floor(weatherData.main?.temp)}&#8451;</p>

              <div>
                <p>High: {Math.floor(weatherData.main?.temp_max)}&#8451;</p>
                <p>Low: {Math.floor(weatherData.main?.temp_min)}&#8451;</p>
              </div>

              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@2x.png`}
                  alt={weatherData.weather?.[0]?.main} />
                <p>{weatherData.weather?.[0]?.main}</p>
              </div>

            </>
          }
        </div>
      </header>
    </div>
  );
}

export default App;

// *1. Get API key
// *2. Set up fetch request - fetch is easy to use, doesn't require external libraries
//  *2a. Set up State
//  *2b. Save data to state
//  *2bb. Gather data needed
//  *2c. Create loader
//  2d. Catch errors
//  2e. Create custom hook
// *3. Create and handle input field
//  *3a. create and handle submit button
// *4. Display response 
// 5. Style response and input - use SCSS
//  5a. responsiveness
// 6. Input Verification
// 7. Split into components
// 8. Accessibility check
// 9. Favicon
// 10. Encrypt the API key
// 11. Transform data into a smaller object
// Nice to have - buttons for major Canadian cities
//  Nice to have - autofill
// Nice to have - day and night theme
