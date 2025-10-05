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
              How Exoplanet Detection Works
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Exoplanet detection primarily relies on observing the effects of
              an exoplanet on its host star. The transit method, one of the most
              common techniques, involves monitoring the star's brightness for
              periodic dips caused by an exoplanet passing in front of it.
              Another method, the radial velocity method, detects the wobble of
              a star caused by the gravitational pull of an orbiting exoplanet.
              Both methods provide valuable data about the exoplanet's size,
              mass, and orbital characteristics.
            </p>
          </div>
          <img
            src="https://ik.imagekit.io/ekdav/learnimg1.jpg?updatedAt=1759524909866"
            alt="Exoplanet"
            className="rounded-xl shadow-[0_0_30px_10px_rgba(255,255,255,0.15)]"
          />
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="https://ik.imagekit.io/ekdav/learnimg2.jpg?updatedAt=1759524914063"
            alt="Telescope detection"
            className="rounded-xl shadow-[0_0_30px_10px_rgba(173,216,230,0.25)] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              Feature Explanations
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Understanding the features used in exoplanet classification is
              crucial. Key features include transit depth (the amount of light
              blocked by the exoplanet), transit duration (how long the
              exoplanet takes to cross the star), and the period of the transit
              (how often the exoplanet orbits). These features, along with
              others like stellar characteristics, help determine the likelihood
              of an exoplanet's existence.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Common False Positives
            </h2>
            <p className="text-gray-300 leading-relaxed">
              False positives can arise from various sources, such as eclipsing
              binary stars (two stars orbiting each other and periodically
              blocking each other's light) or instrumental artifacts.
              Distinguishing between true exoplanet signals and these false
              positives requires careful analysis and validation using multiple
              observation techniques.
            </p>
          </div>
          <img
            src="https://ik.imagekit.io/ekdav/learnimg3.png?updatedAt=1759524914240"
            alt="Planet classification"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(255,255,255,0.2)]"
          />
        </div>

        {/* Section 4 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="https://ik.imagekit.io/ekdav/learnimg4.jpg?updatedAt=1759524910728"
            alt="Habitable zone"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(173,216,230,0.25)] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-6">
              Real Discovery Examples
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Explore real-world examples of exoplanet discoveries made by NASA.
              These examples showcase the application of detection methods and
              feature analysis in identifying and characterizing exoplanets.
              Each case study includes data visualizations and explanations of
              the key findings.
            </p>
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
            src="https://ik.imagekit.io/ekdav/learnimg5.jpg?updatedAt=1759524914365"
            alt="AI in space research"
            className="rounded-xl shadow-[0_0_35px_12px_rgba(255,255,255,0.18)]"
          />
        </div>

        {/* Section 6 */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src="https://ik.imagekit.io/ekdav/learnimg2.jpg?updatedAt=1759524914365"
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
        <button className="bg-[#003c92] hover:bg-blue-700 text-white px-10 py-3 rounded-md text-lg font-medium shadow-[0_0_40px_10px_rgba(0,123,255,0.4)]">
          Start Classifying Exoplanets
        </button>
        <p className="mt-9 text-gray-300 text-sm">
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
