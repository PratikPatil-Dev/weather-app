import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
  const { setInputCity, onKeyPress } = props;

  return (
    <nav className="flex justify-between p-2 items-center">
      <div className="flex">
        <div>
          <img src="./PopCloud.png" alt="logo"></img>
        </div>
        <div className="flex items-center">
          <MdOutlineLocationOn /> Location
        </div>
      </div>
      <div className="w-4/12">
        <div className="bg-[#E6EBF4] w-full py-1 px-2 rounded-xl flex items-center">
          <BiSearch />
          <input
            className="bg-[#E6EBF4] w-full px-2 outline-none"
            type="text"
            placeholder="Search city"
            onChange={(e) => setInputCity(e?.target?.value)}
            onKeyDown={onKeyPress}
          ></input>
        </div>
      </div>
      <div className="flex justify-between w-20 h-10">
        <MdOutlineDarkMode size={25} />
        <CgProfile size={25} />
      </div>
    </nav>
  );
};

export default Navbar;
