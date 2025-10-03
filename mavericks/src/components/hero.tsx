const hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('/src/assets/herobg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#101022]/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-orbit font-semibold mb-6">
          discover new worlds
        </h1>
        <p className="text-lg md:text-xl mb-4">
          our advanced AI analyzes astronomical data to identify potential
          exoplanets.
        </p>
        <p className="text-md md:text-lg mb-8">
          input your observations and let the journey begin.
        </p>
        <a href="#main">
          <button className="px-6 py-2 bg-[#003c92] w-44 hover:bg-blue-700 rounded-md font-semibold transition">
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
};

export default hero;
