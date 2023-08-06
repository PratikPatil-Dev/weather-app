"use client";
import React, { useEffect, useState } from "react";
import WeatherDataContext from "./context/WeatherDataContext";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Map from "./components/Map/Map";
import CurrentCard from "./components/CurrentCards/currentCard";
import ForecastCards from "./components/ForecastCards/ForecastCards";
import Modal from "./components/Modal/Modal";
import axios from "axios";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [latLong, setLatLong] = useState({});
  const [inputCity, setInputCity] = useState("");
  const [manualLatLong, setManualLatLong] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  useEffect(() => setIsModalOpen(true), []);

  // Auto detect location and fetch Weather Data

  // Get auto location and store lattitude and longitude
  const autoDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>
        setLatLong({
          lattitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      ),
        (error) => {
          console.log(error);
        };
    } else {
      console.log("browser not supported");
    }

    setIsModalOpen(false);
  };

  // API call to Get weather data for stored latttitude longitude

  useEffect(() => {
    latLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latLong.lattitude}&lon=${latLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
          )
          .then((response) => {
            setWeatherData(response.data);
          })
      : "";

    latLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.lattitude}&lon=${latLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
          )
          .then((response) => {
            setCurrentWeatherData(response.data);
          })
      : "";
  }, [latLong]);

  // get manually entered location and fetch weather data

  // Get lattitude and longitude for location entered manually by Geocoding API call

  const manualDetectLocation = () => {
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appId=cab97398c632571dc95fc07ef2336e44`
      )
      .then((response) => {
        setManualLatLong({
          lattitude: response.data[0].lat,
          longitude: response.data[0].lon,
        });
      });

    setIsModalOpen(false);
  };

  const onKeyPress = (event) => {
    if (event.keyCode === 13) {
      manualDetectLocation();
    }
  };

  useEffect(() => {
    manualLatLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${manualLatLong.lattitude}&lon=${manualLatLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
          )
          .then((response) => {
            setWeatherData(response.data);
            console.log(response.data);
          })
      : "";

    manualLatLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${manualLatLong.lattitude}&lon=${manualLatLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
          )
          .then((response) => {
            setCurrentWeatherData(response.data);
            console.log(response.data);
          })
      : "";
  }, [manualLatLong]);

  // useEffect(() => {
  //   console.log(currentWeatherData);
  // }, [currentWeatherData]);

  // useEffect(() => {
  //   console.log(weatherData);
  // }, [weatherData]);
  return (
    <>
      <WeatherDataContext.Provider value={{ weatherData, currentWeatherData }}>
        <div className="h-screen">
          <Navbar setInputCity={setInputCity} onKeyPress={onKeyPress} />
          <main className="section1 w-4/5 my-4 mx-auto md:flex justify-between ">
            <Dashboard />
            <CurrentCard />
          </main>
          <main className="section2 w-4/5 my-4 mx-auto flex justify-between ">
            <Map />
            <div className="cards w-full flex justify-evenly flex-wrap items-center">
              <ForecastCards />
              <ForecastCards />
              <ForecastCards />
              <ForecastCards />
              <ForecastCards />
            </div>
          </main>
        </div>
        {isModalOpen == true ? (
          <Modal
            isOpen={isModalOpen}
            autoDetectLocation={autoDetectLocation}
            setInputCity={setInputCity}
            getLocation={manualDetectLocation}
            onKeyPress={onKeyPress}
          />
        ) : (
          ""
        )}
      </WeatherDataContext.Provider>
    </>
  );
}
