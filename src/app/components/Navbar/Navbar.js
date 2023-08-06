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
    <nav className="flex justify-between p-2 items-center">
      <div className="flex">
        <div>
          <img src="./PopCloud.png" alt="logo"></img>
        </div>
        <div className="md:flex items-center hidden ">
          <MdOutlineLocationOn /> {weatherData?.city?.name},
          {weatherData?.city?.country}
        </div>
      </div>
      <div className="w-4/12 flex justify-end mr-2">
        <div className="md:bg-[#E6EBF4] w-fit md:w-full py-1 px-2 rounded-xl flex items-center">
          <BiSearch className="text-2xl " />
          <input
            className="bg-[#E6EBF4] w-full px-2 outline-none hidden md:block"
            type="text"
            placeholder="Search city"
            onChange={(e) => setInputCity(e?.target?.value)}
            onKeyDown={onKeyPress}
          ></input>
        </div>
      </div>
      <div className="flex justify-between w-16 md:w-20 md:h-10">
        <MdOutlineDarkMode size={25} />
        <CgProfile size={25} />
      </div>
    </nav>
  );
};

export default Navbar;
