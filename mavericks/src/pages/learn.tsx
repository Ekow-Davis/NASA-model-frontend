export default function Learn() {
  return (
    <div className="bg-[#101022] font-orbit text-white min-h-screen">
      {/* Top heading */}
      <section className="text-center px-6 py-32">
        <h1 className="text-3xl font-bold mb-6">
          learn about exoplanet classification
        </h1>
        <p className="text-sm text-gray-300 max-w-2xl mx-auto">
          a beginner's guide to the fascinating world of finding new worlds.
        </p>
      </section>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-8 space-y-32">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              What are Exoplanets?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Exoplanets are planets that orbit stars beyond our solar system.
              They can be gas giants like Jupiter, rocky worlds like Earth, or
              even exotic planets unlike anything in our solar system.
              Discoveries of exoplanets have revolutionized our understanding of
              the universe and our place within it.
            </p>
          </div>
          <img
            src="./src/assets/learnimg1.jpg"
            alt="Exoplanet"
            className="rounded-xl shadow-[0_0_30px_10px_rgba(255,255,255,0.15)]"
          />
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="./src/assets/learnimg2.jpg"
            alt="Telescope detection"
            className="rounded-xl shadow-[0_0_30px_10px_rgba(173,216,230,0.25)] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              How Do We Detect Exoplanets?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Scientists use several techniques to find exoplanets. The most
              common methods are:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
              <li>
                <strong>Transit Method:</strong> Observing dips in a star’s
                brightness when a planet passes in front.
              </li>
              <li>
                <strong>Radial Velocity:</strong> Measuring tiny wobbles in a
                star’s motion caused by an orbiting planet.
              </li>
              <li>
                <strong>Direct Imaging:</strong> Capturing actual images of
                large exoplanets far from their stars.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Why Classify Exoplanets?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Classifying exoplanets helps scientists understand their
              properties—size, orbit, temperature, atmosphere—and whether they
              might be habitable. This classification helps prioritize targets
              for future missions and exploration.
            </p>
          </div>
          <img
            src="./src/assets/learnimg3.png"
            alt="Planet classification"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Section 4 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="./src/assets/learnimg4.jpg"
            alt="Habitable zone"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(173,216,230,0.25)] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              Signs of Habitability
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Not all exoplanets are habitable. Scientists look for:
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
              <li>
                The <strong>habitable zone</strong>—where liquid water could
                exist.
              </li>
              <li>Atmospheres with gases like oxygen or methane.</li>
              <li>
                Stable stars that don’t blast planets with harmful radiation.
              </li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              The Role of AI in Classification
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Modern astronomy generates massive datasets. AI tools, like
              Maverick AI, analyze this data to detect patterns humans might
              miss. Machine learning models can quickly classify thousands of
              candidates with high accuracy, accelerating discoveries.
            </p>
          </div>
          <img
            src="./src/assets/learnimg5.jpg"
            alt="AI in space research"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(255,255,255,0.18)]"
          />
        </div>

        {/* Section 6 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="./src/assets/learnimg5.jpg"
            alt="Citizen science"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(173,216,230,0.25)] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              Citizen Science and You
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Ordinary people can contribute to the search for new worlds.
              Platforms like Zooniverse allow volunteers to help identify
              exoplanet signals in telescope data. By joining, you could play a
              role in discovering entirely new worlds!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-24">
        <button className="bg-[#003c92] hover:bg-blue-700 text-white px-10 py-3 rounded-md text-xl font-semibold shadow-[0_0_40px_10px_rgba(0,123,255,0.4)]">
          Start Classifying Exoplanets
        </button>
        <p className="mt-9 text-gray-300 text-lg">
          Join us and make a real discovery.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-8 border-t border-gray-700">
        ©2024 Maverick AI — A project inspired by NASA's mission to explore.
      </footer>
    </div>
  );
}
