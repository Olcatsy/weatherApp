import React from 'react'

import Loader from 'components/Loader/Loader';

const WeatherCard = ({
  city,
  error,
  loading,
  weatherData,
}) => {
  return (
    <div className="card-wrapper">
      {error && <p>Error{error}</p>}
      {loading
        ? <Loader />
        : <div className='card'>
          {weatherData &&
            <>
              <h2 className="card-city">{city}</h2>

              <div className="card-temperature">
                <p className="card-temperature-main">
                  {Math.floor(weatherData?.temperature)}&#8451;
                </p>

                <p className="card-temperature-secondary">
                  Feels like {Math.floor(weatherData?.feelsLike)}&#8451;
                </p>
              </div>

              <div className="card-weather">
                <img
                  className="card-weather-icon"
                  src={`https://openweathermap.org/img/wn/${weatherData?.weatherIcon}@2x.png`}
                  alt='' />
                <p className="card-weather-type">{weatherData?.weatherType}</p>
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}

export default WeatherCard;