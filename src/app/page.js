"use client";
import React, { useEffect, useState } from "react";
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
  const [autoWeatherData, setAutoWeatherData] = useState({});
  const [inputCity, setInputCity] = useState("");
  const [manualLocation, setManualLocation] = useState({});
  const [manualLatLong, setManualLatLong] = useState({});
  const [manualWeatherData, setManualWeatherData] = useState({});

  useEffect(() => setIsModalOpen(true), []);

  // Auto detect location and fetch Weather Data
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

  useEffect(() => {
    latLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.lattitude}&lon=${latLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44`
          )
          .then((response) => {
            setAutoWeatherData(response.data);
            console.log(response.data);
          })
      : "";
  }, [latLong]);

  // get manually entered location and fetch weather data

  const manualDetectLocation = () => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appId=cab97398c632571dc95fc07ef2336e44`
      )
      .then((response) => {
        setManualLocation(response.data[0]);
        console.log(response.data[0]);
      })
      .then(
        setManualLatLong({
          lattitude: manualLocation.Lat,
          longitude: manualLocation.Lon,
        })
      )
      .then(console.log(manualLatLong));

    setIsModalOpen(false);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      manualDetectLocation();
    }
  };

  useEffect(() => {
    manualLatLong.lattitude
      ? axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${manualLatLong.lattitude}&lon=${manualLatLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44`
          )
          .then((response) => {
            setManualWeatherData(response.data);
            console.log(response.data);
          })
      : "";
  }, [manualLatLong]);

  return (
    <>
      <div className="h-screen">
        <Navbar setInputCity={setInputCity} onKeyPress={onKeyPress} />
        <main className="section1 w-4/5 my-4 mx-auto flex justify-between ">
          <Dashboard />
          <div className="cards w-full flex justify-evenly flex-wrap items-center">
            <CurrentCard />
            <CurrentCard />
            <CurrentCard />
            <CurrentCard />
          </div>
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
          onClose={autoDetectLocation}
          setInputCity={setInputCity}
          getLocation={manualDetectLocation}
        />
      ) : (
        ""
      )}
    </>
  );
}
