import axios from 'axios';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { UserLocationContext } from './Components/UserLocationContext';
import SearchAndSummary from './Components/NavWindow/NavWindow';
import Main from './Components/Main/Main';
import Spinner from './Components/Spinner';

function App() {
  const [userLocationID, setUserLocationID] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [isError, setError] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [dates, setDates] = useState(null);
  const [tempUnit, setTempUnit] = useState('C');

  // Get user geolocation
  const getPos = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // On page load: get user location & set weather data to state
  useEffect(() => {
    const getData = async () => {
      setError(false);
      setLoading(true);

      const pos = await getPos();

      try {
        // Get city ID for weather request
        const response = await axios.get(
          `https://weather-croxy.herokuapp.com/http://www.metaweather.com/api/location/search/?lattlong=${pos.coords.latitude},${pos.coords.longitude}`
        );
        const cityId = response.data[0].woeid;

        // Get weather info using cityID
        const responseWeather = await axios.get(
          `https://weather-croxy.herokuapp.com/http://www.metaweather.com/api/location/${cityId}`
        );

        setWeatherData(responseWeather.data);
        setUserLocationID(response.data[0].woeid); // Store user location for 'gps' btn
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(`An Error Occured: ${error.request.statusText}`);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      }
    };
    getData();
  }, []);

  // only get dates once weather state updated
  useEffect(() => {
    // Isolate dates from weather data
    const getDates = () => {
      return new Promise(
        (resolve) => {
          if (weatherData) {
            // map dates to "YYYY, MM, DD"
            const dateStrings = weatherData.consolidated_weather.map((day) =>
              day.applicable_date.split('-')
            );
            // map to raw date format
            const datesRaw = dateStrings.map(
              (date) =>
                new Date(
                  Number(date[0]),
                  // needed to fix with -1 as month is 0 based
                  Number(date[1] - 1),
                  Number(date[2])
                )
            );
            // map to desired format e.g. 'Fri, Jul 23'
            const options = {
              day: 'numeric',
              month: 'short',
              weekday: 'short',
            };
            const intlDates = datesRaw.map((date) =>
              new Intl.DateTimeFormat(navigator.language, options).format(date)
            );
            setDates(intlDates);
            resolve(null);
          }
        },
        (reject) => {
          new Error(reject);
          console.log('getDates rejected:', reject);
        }
      );
    };
    getDates();
  }, [weatherData]);

  // spinner styles
  const override = css`
    display: block;
    position: absolute;
    top: 45%;
    left: 50%;
    border-color: red;
  `;

  return (
    <div className='App'>
      {isLoading && <Spinner override={override} />}
      <div className='main-container' style={{ position: isError && 'relative' }}>
        {isError && <h1 className='error'>{isError}</h1>}
        <UserLocationContext.Provider
          value={{
            isLoading,
            setLoading,
            isError,
            weatherData,
            dates,
            tempUnit,
            setTempUnit,
            setWeatherData,
            userLocationID,
            reloading,
            setReloading,
          }}
        >
          {!isLoading && weatherData && dates && (
            <>
              <SearchAndSummary />
              <Main />
            </>
          )}
        </UserLocationContext.Provider>
      </div>
    </div>
  );
}

export default App;
