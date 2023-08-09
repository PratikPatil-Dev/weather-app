import React, { Component, useContext, useEffect, useState } from "react";
// import Chart from "react-apexcharts";
import WeatherDataContext from "@/app/context/WeatherDataContext";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TempChart = () => {
  const { next5Days, forecast } = useContext(WeatherDataContext);
  const [chartData, setChartData] = useState({});
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [pop, setPop] = useState([]);

  useEffect(() => {
    const popArray = forecast.map((item) => {
      return Math.trunc(item.pop * 100);
    });
    setPop(popArray);
  }, [forecast]);

  useEffect(() => {
    console.log(pop);
  }, [pop]);

  useEffect(() => {
    setOptions({
      title: {
        text: "Chances of rain in %",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      chart: {
        id: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
      },

      xaxis: {
        categories: next5Days,
      },
    }),
      setSeries([
        {
          name: "Rain-probability",
          data: pop,
        },
      ]);
  }, [next5Days, pop]);
  return (
    <div className="app w-full md:w-2/4 h-64 rounded-xl overflow-hidden flex flex-col justify-between my-4 relative backdrop-blur-lg bg-white/25 md:p-2">
      <div className="row">
        <div className="mixed-chart">
          {typeof window !== "undefined" && (
            <Chart options={options} series={series} type="line" width="400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TempChart;
