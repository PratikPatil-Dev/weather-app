"use client";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Map from "./components/Map/Map";
import CurrentCard from "./components/CurrentCards/currentCard";
import ForecastCards from "./components/ForecastCards/ForecastCards";
import Modal from "./components/Modal/Modal";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <div className="h-screen">
        <Navbar />
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
      <Modal/>
    </>
  );
}
