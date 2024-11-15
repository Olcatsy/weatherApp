import './App.css';
import React, { useState, useEffect } from 'react';

import SearchBar from 'components/SearchBar/SearchBar';
import WeatherCard from 'components/WeatherCard/WeatherCard';
import logo from 'assets/logo.png'

import useWeatherData from 'api/useWeatherData';

function App() {
  const [city, setCity] = useState('Toronto')
  const [dayOrNight, setDayOrNight] = useState('') // use for day/night theme
  const {weatherData, loading, error} = useWeatherData({city})

  // use for day/night theme
  const getDayOrNight = () => {
    const now = Date.now()
    const sunset = new Date(weatherData?.sunsetTime * 1000) // convert to milliseconds
    const sunrise = new Date(weatherData?.sunriseTime * 1000)

    if (now <= sunrise || now >= sunset ) {
      setDayOrNight('night')
    } else if (now > sunrise && now < sunset) {
      setDayOrNight('day')
    } else {
      setDayOrNight('error')
    }
  }

  useEffect(() => {
    getDayOrNight()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  return (
    <div className="App">
      <main>
        <div className={`container ${dayOrNight}-theme`}>

          <div className="header-wrapper">
            <img
              className="header-logo"
              src={logo}
              alt=""
            />
            <h1 className="header-text">Breezio</h1>
          </div>

          <SearchBar
            setCity={setCity}
          />

          {/* display data here */}
          {weatherData
            ? <WeatherCard
              city={city}
              error={error}
              loading={loading}
              weatherData={weatherData}
            />
            : <p>City not found.Please try again</p>
          }
        </div>

      </main>
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
//  *2d. Catch errors
//  *2e. Create custom hook
// *3. Create and handle input field
//  *3a. create and handle submit button
// *4. Display response 
// *5. Style response and input - use SCSS
//  *5a. responsiveness
// *6. Input Verification
// *7. Split into components
// *8. Accessibility check
// *9. Favicon
// *10. Encrypt the API key
// *11. Transform data into a smaller object

// Nice to have - buttons for major Canadian cities
// Nice to have - autofill
// *Nice to have - day and night theme
// Nice to have - Refactor with SCSS variables for reusability
