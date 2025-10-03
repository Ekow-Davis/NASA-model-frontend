const main = () => {
  return (
    <section
      id="main"
      className="font-orbit min-h-screen bg-[#101022] text-white px-8 py-16"
    >
      <h1 className="text-2xl  font-bold text-center">exoplanet data input</h1>
      <p className="text-center text-sm mt-2 mb-12">
        provide the eight ( 8 ) key features to classify your exoplanet
        candidates.
      </p>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-semibold mb-3">
              orbital period ( days )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18]  w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              transit duration ( hours )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              transit depth ( parts per million )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              signal-to-noise ratio ( snr )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-semibold mb-3">
              star temperature ( kelvin )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              star surface gravity ( log cm/s² )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              star size ( solar radii )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              apparent brightness ( magnitude )
            </h3>
            <input
              type="number"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="text-center mt-12">
        <button className="px-6 py-2 bg-[#003c92] w-44 hover:bg-blue-700 rounded-md font-semibold transition">
          Predict Now
        </button>
      </div>
    </section>
  );
};

export default main;
