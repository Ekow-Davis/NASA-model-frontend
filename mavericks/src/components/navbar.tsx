export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#101021]/70 backdrop-blur-xs text-white flex justify-between items-center px-8 py-4 z-50">
      {/* Logo */}
      <div className="font-orbit text-xl font-bold tracking-wide">
        maverick.ai
      </div>

      {/* Navlinks */}
      <ul className="flex space-x-8 font-orbit font-light text-sm">
        <li className="hover:text-gray-300 cursor-pointer">home</li>
        <li className="hover:text-gray-300 cursor-pointer">learn</li>
        <li className="hover:text-gray-300 cursor-pointer">advanced</li>
      </ul>

      {/* Planet + NASA */}
      <div className="flex items-center space-x-1">
        {/* Orbit system */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* central planet */}
          <div className="w-3 h-3 bg-[#0B3D91] rounded-full"></div>
          {/* orbiting planet */}
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
