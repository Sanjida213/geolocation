import { useEffect, useState } from 'react';
import { WeatherData } from './types/WeatherData';
import './App.scss';

const App = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const getWeather = async (location: string) => {
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching weather data: ${res.statusText}`);
      }
      const data: WeatherData = await res.json();
      console.log('Fetched weather data:', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationString = `${latitude},${longitude}`;
        console.log('Location:', locationString);
        setLocation(locationString);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location]);

  const handleSearch = () => {
    if (searchLocation) {
      setLocation(searchLocation);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLocation(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather">
      <section className="container">
        <div className="weather__search">
          <input
            type="text"
            value={searchLocation}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter location"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="weather__top-section">
          {weatherData && (
            <>
              <p className="weather__location">{weatherData.location.name}</p>
              <p className="weather__temperature">{weatherData.current.temp_c}°C</p>
              <p className="weather__description">{weatherData.current.condition.text.toLowerCase()}</p>
              {weatherData.current.condition.icon && (
                <img
                  className="weather__icon"
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                />
              )}
            </>
          )}
        </div>
        <div className="weather__bottom-section">
          <p className="weather__wind">Wind mph: {weatherData?.current.wind_mph}</p>
          <p className="weather__humidity">Humidity: {weatherData?.current.humidity}</p>
        </div>
      </section>
    </div>
  );
};

export default App;
