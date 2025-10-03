import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#101021]/70 backdrop-blur-sm text-white flex justify-between items-center px-6 py-4 z-50">
      {/* Logo */}
      <div className="font-orbit text-xl font-bold tracking-wide">
        maverick.ai
      </div>

      {/* Hamburger (Mobile Only) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Navlinks */}
      <ul
        className={`md:flex space-x-8 font-orbit font-light text-sm absolute md:static bg-[#101021] md:bg-transparent w-full md:w-auto left-0 md:left-auto top-16 md:top-auto flex-col md:flex-row items-center transition-all duration-300 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <NavLink
          to="/"
          className="hover:text-gray-300 cursor-pointer py-2 md:py-0"
        >
          home
        </NavLink>
        <Link
          to="/learn"
          className="hover:text-gray-300 cursor-pointer py-2 md:py-0"
        >
          learn
        </Link>
        <Link
          to="/researcher"
          className="hover:text-gray-300 cursor-pointer py-2 md:py-0"
        >
          researcher
        </Link>
        <Link
          to="/model"
          className="hover:text-gray-300 cursor-pointer py-2 md:py-0"
        >
          model
        </Link>
      </ul>

      {/* Planet + NASA */}
      <div className="hidden md:flex items-center space-x-1">
        {/* Orbit system */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="w-3 h-3 bg-[#0B3D91] rounded-full"></div>
          <div className="absolute w-1 h-1 bg-red-500 rounded-full animate-orbit"></div>
        </div>

        {/* NASA styled logo */}
        <div className="relative flex items-center justify-center">
          <span className="shiny-text text-2xl font-extrabold text-[#0B3D91] tracking-widest relative z-10">
            NASA
          </span>
          <span className="nasa-swoosh"></span>
        </div>
      </div>
    </nav>
  );
}
