import WeatherDataContext from "@/app/context/WeatherDataContext";
import { useContext, useEffect, useState } from "react";

export default function CurrentCard() {
  const { weatherData, currentWeatherData } = useContext(WeatherDataContext);
  const [icon, setIcon] = useState("10d");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [temp, setTemp] = useState({});
  const [wind, setWind] = useState({});
  const [skyConditions, setSkyConditions] = useState({});

  useEffect(() => {
    if (weatherData?.list) {
      setIcon(weatherData?.list[0]?.weather[0]?.icon);
      setWeatherCondition(weatherData?.list[0]?.weather[0]);
      setTemp({
        min: Math.round(currentWeatherData?.main?.temp_min),
        max: Math.round(currentWeatherData?.main?.temp_max),
      });
      currentWeatherData?.wind?.gust
        ? setWind({
            speed: Math.round(3.6 * currentWeatherData?.wind?.speed),
            gust: Math.round(3.6 * currentWeatherData?.wind?.gust),
          })
        : setWind({
            speed: Math.round(3.6 * currentWeatherData?.wind?.speed),
          });
      setSkyConditions({
        clouds: currentWeatherData?.clouds?.all,
        visibility: currentWeatherData?.visibility / 1000,
      });
    }
  }, [weatherData, currentWeatherData]);

  return (
    <div className="cards w-full flex justify-evenly flex-wrap items-center">
      <div
        id="card1"
        className="bg-gray-200 h-24 w-72 rounded-full overflow-hidden flex"
      >
        <div>
          <img
            className="w-full h-full"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="day rain"
          />
        </div>
        <div className=" m-auto">
          <h1 className="font-bold ">{weatherCondition.main}</h1>
          <h3 className="text-sm text-slate-500">
            Expect {weatherCondition.description}
          </h3>
        </div>
      </div>
      <div
        id="card2"
        className="bg-gray-200 h-24 w-72 rounded-full overflow-hidden flex"
      >
        <div className="w-24 h-full flex justify-center items-center">
          <img
            className="w-12"
            src="https://i.postimg.cc/Kcr2SHMC/image.png"
            alt="wind"
          />
        </div>
        <div className=" m-auto">
          <h1 className="font-bold ">Wind</h1>
          <h3 className="text-sm text-slate-500">Speed : {wind.speed} km/h</h3>
          {wind.gust ? (
            <h3 className="text-sm text-slate-500">
              Wind gust: {wind.gust} km/hr
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        id="card3"
        className="bg-gray-200 h-24 w-72 rounded-full overflow-hidden flex"
      >
        <div className="w-24 h-full flex justify-center items-center">
          <img
            className="w-16"
            src="https://i.postimg.cc/ZRzT4VNC/image.png"
            alt="temperature"
          />
        </div>
        <div className=" m-auto">
          <h1 className="font-bold ">Today's High/Low</h1>
          <h3 className="text-sm text-slate-500">Low: {temp.min}</h3>
          <h3 className="text-sm text-slate-500">High: {temp.max}</h3>
        </div>
      </div>
      <div
        id="card4"
        className="bg-gray-200 h-24 w-72 rounded-full overflow-hidden flex"
      >
        <div className="w-24 h-full flex justify-center items-center">
          <img
            className="w-16"
            src="https://i.postimg.cc/tRFtyLpd/image.png"
            alt="temperature"
          />
        </div>
        <div className=" m-auto">
          <h1 className="font-bold ">Sky Conditions</h1>
          <h3 className="text-sm text-slate-500">
            Cloudiness: {skyConditions.clouds}%
          </h3>
          <h3 className="text-sm text-slate-500">
            Visibility: {skyConditions.visibility} km
          </h3>
        </div>
      </div>
    </div>
  );
}
