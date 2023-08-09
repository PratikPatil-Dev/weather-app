import React, { useContext } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import WeatherDataContext from "@/app/context/WeatherDataContext";

const Navbar = (props) => {
  const { setInputCity, onKeyPress } = props;
  const { weatherData } = useContext(WeatherDataContext);

  return (
    <nav className="flex justify-between p-2 items-center relative backdrop-blur-lg bg-white/30">
      <div className="flex">
        <div>
          <img className="mt-2" src="./PopCloud.png" alt="logo"></img>
        </div>
      </div>
      <div className="w-4/12 flex justify-end mr-2">
        <div className=" w-full py-1 px-2 rounded-xl md:flex hidden">
          <BiSearch className="text-3xl text-slate-800 absolute pl-2" />
          <input
            className="backdrop-blur-lg bg-white/25 w-full outline-none md:block pl-10 h-8 rounded-xl "
            type="text"
            placeholder="Search city"
            onChange={(e) => setInputCity(e?.target?.value)}
            onKeyDown={onKeyPress}
          ></input>
        </div>
        <div className=" py-1 px-2 rounded-xl flex md:hidden w-10/12 absolute items-center -bottom-16 text-white left-2/4 transform -translate-x-1/2 -translate-y-1/2 ">
          <BiSearch className="text-3xl text-slate-800 absolute pl-2" />
          <input
            className="backdrop-blur-lg bg-white/25 w-full outline-none md:block pl-10 h-8 rounded-xl text-slate-700"
            type="text"
            placeholder="Search city"
            onChange={(e) => setInputCity(e?.target?.value)}
            onKeyDown={onKeyPress}
          ></input>
        </div>
      </div>
      <div className="flex justify-between md:w-44 w-48  text-slate-600">
        <div className="flex items-center text-slate-600 mx-auto">
          <MdOutlineLocationOn /> {weatherData?.city?.name},
          {weatherData?.city?.country}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
