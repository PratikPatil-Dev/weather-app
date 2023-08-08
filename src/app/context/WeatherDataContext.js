import React from "react";

const WeatherDataContext = React.createContext({
  weatherData: {},
  currentWeatherData: {},
  next5Days: [],
});

export default WeatherDataContext;
