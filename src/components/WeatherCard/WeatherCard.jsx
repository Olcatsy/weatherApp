import React from 'react'

import Loader from 'components/Loader/Loader';

const WeatherCard = ({
  city,
  error,
  loading,
  weatherData,
}) => {
  return (
    <div>
      {error && <p>Error{error}</p>}
      {loading
        ? <Loader />
        : <>
          {weatherData &&
            <>
              <h2>{city}</h2>
              <p>{Math.floor(weatherData?.temperature)}&#8451;</p>

              <p>Feels like {Math.floor(weatherData?.feelsLike)}&#8451;</p>

              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData?.weatherIcon}@2x.png`}
                  alt='' />
                <p>{weatherData?.weatherType}</p>
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default WeatherCard;