import React from "react";
import { FaBell, FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 shadow-md">
      <div className="px-4 py-3 flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">Barrow pay</span>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 transition">
            <FaBell />
          </button>
          <button
            // onClick={toggleDarkMode}
            className="p-2 rounded-full text-green-600 hover:bg-green-100 dark:hover:bg-gray-700 transition"
          >
            <FaMoon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
