import { useContext, useEffect, useState } from "react";
import WeatherDataContext from "@/app/context/WeatherDataContext";
import moment from "moment/moment";

export default function ForecastCards({ updateDays, getForecastData }) {
  const { weatherData, next5Days } = useContext(WeatherDataContext);
  const [forecastData, setForecastData] = useState([]);
  const [days, setDays] = useState([]);

  const indexOfObj = [7, 15, 23, 31, 39];
  useEffect(() => {
    if (weatherData?.list) {
      const forecastArray = indexOfObj.map((index) => weatherData.list[index]);
      setForecastData(forecastArray);
    }
  }, [weatherData]);

  // * Used moment library to format the day directly.

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    if (forecastData?.length > 0) {
      let daysArray = forecastData.map((forecast) => {
        let date = forecast.dt_txt;
        return moment(forecast.dt_txt).format("ddd");
      });
      setDays(daysArray);
    }
  }, [forecastData]);

  useEffect(() => {
    updateDays(days);
  }, [days]);

  useEffect(() => {
    getForecastData(forecastData)
  }, [forecastData]);

  return (
    <>
      {forecastData?.map((forecast, index) => (
        <div
          key={index}
          className="backdrop-blur-lg bg-white/25 w-28 h-full rounded-full overflow-hidden text-center flex flex-col justify-between my-2"
        >
          <div className="">
            <h1 className="py-2 px-4 w-fit mx-auto border-b-2 border-black font-bold">
              {moment(forecast.dt_txt).format("ddd")}
            </h1>
          </div>
          <div>
            <img
              className="w-24 h-24 m-auto"
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="day rain"
            />
            <p className="text-slate-700">{forecast.weather[0].main}</p>
          </div>
          <div className="">
            <h1 className="py-2 px-4 w-fit mx-auto border-t-2 border-black font-bold">
              {Math.floor(forecast.main.temp)}&deg;
            </h1>
          </div>
        </div>
      ))}
    </>
  );
}
