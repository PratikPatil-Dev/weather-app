"use client";
import React, { useEffect, useState } from "react";
import WeatherDataContext from "./context/WeatherDataContext";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import CurrentCard from "./components/CurrentCards/currentCard";
import ForecastCards from "./components/ForecastCards/ForecastCards";
import Modal from "./components/Modal/Modal";
import axios from "axios";
import TempChart from "./components/Chart/Chart";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [latLong, setLatLong] = useState({});
  const [inputCity, setInputCity] = useState("");
  const [manualLatLong, setManualLatLong] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [next5Days, setNext5Days] = useState([]);
  const [forecast, setforecast] = useState([]);

  useEffect(() => {
    const loadingToast = toast.loading("Loading... Please wait");
    setIsModalOpen(true);

    setTimeout(() => {
      toast.dismiss(loadingToast);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isModalOpen == true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isModalOpen]);

  // Auto detect location and fetch Weather Data

  // Get auto location and store lattitude and longitude

  const autoDetectLocation = () => {
    if (navigator.geolocation) {
      const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          (error) => reject(error)
        );
      });

      toast.promise(
        promise,
        {
          loading: "Detecting location...",
          success: (position) => {
            setLatLong({
              latitude: position.latitude,
              longitude: position.longitude,
            });
            setIsModalOpen(false);
            return "Location detected!";
          },
          error: "Failed to detect location",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
    } else {
      toast.error("Geolocation is not available on this device.");
    }
  };

  // API call to Get weather data for stored latttitude longitude

  useEffect(() => {
    if (latLong.latitude && latLong.longitude) {
      const forecastPromise = axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
        )
        .then((response) => response.data)
        .catch((error) => {
          throw new Error("Failed to fetch forecast data");
        });

      const currentWeatherPromise = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latLong.latitude}&lon=${latLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
        )
        .then((response) => response.data)
        .catch((error) => {
          throw new Error("Failed to fetch current weather data");
        });

      toast.promise(Promise.all([forecastPromise, currentWeatherPromise]), {
        loading: "Fetching weather data...",
        success: (data) => {
          setWeatherData(data[0]); // Set forecast data
          setCurrentWeatherData(data[1]); // Set current weather data
          return "Weather data fetched!";
        },
        error: "Failed to fetch weather data",
      });
    }
  }, [latLong]);

  // get manually entered location and fetch weather data

  // Get lattitude and longitude for location entered manually by Geocoding API call

  const manualDetectLocation = () => {
    const promise = axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&appId=cab97398c632571dc95fc07ef2336e44`
      )
      .then((response) => ({
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      }))
      .catch((error) => {
        throw new Error("Incorrect city name");
      });

    toast.promise(
      promise,
      {
        loading: "Fetching location details...",
        success: (position) => {
          setManualLatLong({
            latitude: position.latitude,
            longitude: position.longitude,
          });
          setIsModalOpen(false);
          setInputCity("");
          return "Location details fetched!";
        },
        error: "Failed to fetch location details",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
  };

  const onKeyPress = (event) => {
    if (event.keyCode === 13) {
      manualDetectLocation();
    }
  };

  useEffect(() => {
    if (manualLatLong.latitude && manualLatLong.longitude) {
      const forecastPromise = axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${manualLatLong.latitude}&lon=${manualLatLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
        )
        .then((response) => response.data)
        .catch((error) => {
          throw new Error("Failed to fetch forecast data");
        });

      const currentWeatherPromise = axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${manualLatLong.latitude}&lon=${manualLatLong.longitude}&appid=cab97398c632571dc95fc07ef2336e44&units=metric`
        )
        .then((response) => response.data)
        .catch((error) => {
          throw new Error("Failed to fetch current weather data");
        });

      toast.promise(Promise.all([forecastPromise, currentWeatherPromise]), {
        loading: "Fetching weather data...",
        success: (data) => {
          setWeatherData(data[0]); // Set forecast data
          setCurrentWeatherData(data[1]); // Set current weather data
          return "Weather data fetched!";
        },
        error: "Failed to fetch weather data",
      });
    }
  }, [manualLatLong]);

  const updateDays = (days) => {
    setNext5Days(days);
  };

  const getForecastData = (forecastData) => {
    setforecast(forecastData);
  };

  return (
    <>
      <WeatherDataContext.Provider
        value={{ weatherData, currentWeatherData, next5Days, forecast }}
      >
        <div className="h-screen">
          <Toaster />
          <Navbar setInputCity={setInputCity} onKeyPress={onKeyPress} />
          <main className="section1 w-4/5 mt-20 md:my-4 mx-auto md:flex justify-between ">
            <Dashboard />
            <CurrentCard />
          </main>
          <main className="section2 md:w-4/5 my-8 mx-auto md:flex justify-between  ">
            <TempChart />
            <div className="cards w-full flex justify-evenly flex-wrap items-center">
              <ForecastCards
                updateDays={updateDays}
                getForecastData={getForecastData}
              />
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
        ) : null}
      </WeatherDataContext.Provider>
    </>
  );
}
