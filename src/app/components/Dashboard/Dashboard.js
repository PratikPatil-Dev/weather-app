import WeatherDataContext from "@/app/context/WeatherDataContext";
import { useContext, useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentWeatherData } = useContext(WeatherDataContext);
  const [clock, setClock] = useState("");
  const [day, setDay] = useState("");
  const [weatherCond, setWeatherCond] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [videoLink, setVideoLink] = useState("");

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

  // Different Weather backgrounds as per weather conditions

  useEffect(() => {
    switch (weatherCondition) {
      case "Clear":
        setVideoLink("https://i.imgur.com/CMPyHeG.mp4");
        break;
      case "Rain":
        setVideoLink("https://i.imgur.com/XCqhve1.mp4");
        break;
      case "Clouds":
        setVideoLink("https://i.imgur.com/MPGmERW.mp4");
        break;
      case "Snow":
        setVideoLink("https://i.imgur.com/jJJkFn4.mp4");
        break;
      case "Drizzle":
        setVideoLink("https://i.imgur.com/Tfz3YxS.mp4");
        break;
      case "Thunderstorm":
        setVideoLink("https://i.imgur.com/dIR6jS1.mp4");
        break;
      default:
        setVideoLink("https://i.imgur.com/d7kZray.mp4");
    }
  }, [weatherCondition]);

  return (
    <div className="w-full md:w-2/4 h-60 bg-gray-200 mr-4 rounded-xl overflow-hidden flex flex-col justify-between my-4 relative">
      <div className="overlay absolute w-full h-full top-0 right-0 rounded-xl"></div>
      <video
        src={videoLink}
        className="w-full h-full object-cover	rounded-xl"
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 right-0 text-white">
        <div className="flex justify-between py-2 px-2 ">
          <div>
            <h1>{day}</h1>
          </div>
          <div>
            <h1>{clock}</h1>
          </div>
        </div>
        <div className="flex flex-col m-auto items-center w-40 py-8">
          <div className="flex w-full justify-evenly ">
            <div>
              <h1 className="text-7xl font-semibold mr-1">
                {Math.floor(currentWeatherData?.main?.temp)}&deg;
              </h1>
            </div>
            <div className="border-l-2 border-white pl-4 my-auto">
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
    </div>
  );
}
