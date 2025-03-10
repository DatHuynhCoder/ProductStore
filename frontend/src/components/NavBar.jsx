import React from "react";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="min-h-10 p-2 sm:p-3 bg-blue-950 flex justify-between items-center">

      <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 text-2xl sm:text-3xl md:text-4xl p-2 font-bold">
        <Link to="/">PRODUCT STORE 🛒</Link>
      </div>

      <div className="p-2 bg-white/30 backdrop-blur-md rounded-lg hover:backdrop-blur-none hover:bg-green-300 transition duration-300">
        <Link to="/create">
          <FaRegPlusSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#12a686]" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
