import WeatherDataContext from "@/app/context/WeatherDataContext";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { currentWeatherData } = useContext(WeatherDataContext);
  const [clock, setClock] = useState("");
  const [day, setDay] = useState("");
  const [weatherCond, setWeatherCond] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");

  // useEffect(() => {
  //   console.log(currentWeatherData);
  // }, [currentWeatherData]);

  useEffect(() => {
    if (currentWeatherData?.weather) {
      let weatherConditions = currentWeatherData?.weather[0].description;
      setWeatherCond(weatherConditions);

      let weatherCondition = currentWeatherData?.weather[0].main;
      setWeatherCondition(weatherCondition);
    }
  }, [currentWeatherData]);

  // Get current Time and day
  useEffect(() => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();
    setDay(weekday[date.getDay()]);

    const now = new Date();

    // Get the hours and minutes from the IST date object
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // converting 24hr formt to 12hr format
    let time = "";

    if (hours >= 12) {
      time = `${hours - 12}:${minutes}`;
      time += " PM";
    } else {
      time = `${hours}:${minutes}`;
      time += " AM";
    }

    // Log the hours and minutes to the console
    setClock(time);
  }, []);

  return (
    <div className="w-2/4 h-60 bg-gray-200 mr-4 rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between py-2 px-2 ">
        <div>
          <h1>{day}</h1>
        </div>
        <div>
          <h1>{clock}</h1>
        </div>
      </div>
      <div className="flex flex-col m-auto items-center w-40">
        <div className="flex w-full justify-evenly">
          <div>
            <h1 className="text-7xl font-semibold">
              {Math.floor(currentWeatherData?.main?.temp)}&deg;
            </h1>
          </div>
          <div className="border-l-2 border-black pl-4 my-auto">
            <h1>{Math.floor(currentWeatherData?.main?.temp_min)}&deg;</h1>
            <h1>{Math.floor(currentWeatherData?.main?.temp_max)}&deg;</h1>
          </div>
        </div>
        <div>
          <h1>{weatherCond}</h1>
        </div>
      </div>
      <div className="flex justify-between py-2 px-2">
        <div>
          <h1>
            Real Feel: {Math.floor(currentWeatherData?.main?.feels_like)}&deg;
          </h1>
        </div>
        <div>
          <h1>{weatherCondition}</h1>
        </div>
      </div>
    </div>
  );
}
