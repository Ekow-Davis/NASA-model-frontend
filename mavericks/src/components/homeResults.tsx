import { FaSearch } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

type ResultCardProps = {
  isExoplanet: boolean;
  accuracy: number;
};

export default function ResultCard({ isExoplanet, accuracy }: ResultCardProps) {
  return (
    <section className="font-orbit min-h-screen bg-[#0a0a18] text-white px-8 pt-16">
      <h1 className="text-3xl font-bold text-center mb-10">
        prediction result
      </h1>

      <div className="bg-[#101022]  text-white rounded-lg shadow-lg max-w-3xl mx-auto p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isExoplanet ? "bg-[#101041]" : "bg-red-200/40"
            }`}
          >
            {isExoplanet ? (
              <FaSearch className="text-blue-600 text-3xl" />
            ) : (
              <FaTimesCircle className="text-red-600 text-3xl" />
            )}
          </div>
        </div>

        {/* Result Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isExoplanet ? "Exoplanet Detected" : "Not an Exoplanet"}
        </h2>

        {/* Accuracy Bar */}
        <div className="mb-2 flex justify-between text-sm font-medium text-gray-700">
          <span>accuracy</span>
          <span>{accuracy}%</span>
        </div>
        <div className="w-full bg-[#101041] rounded-full h-[4px]">
          <div
            className={`h-[4px] rounded-full ${
              isExoplanet ? "bg-[#0f0fbd]" : "bg-red-500"
            }`}
            style={{ width: `${accuracy}%` }}
          />
        </div>

        {/* Explanation */}
        <p className="mt-6 text-white text-xs text-center leading-relaxed">
          {isExoplanet
            ? `The model predicts with ${accuracy}% confidence that the provided data indicates the presence of an exoplanet. This conclusion is based on the analysis of key features such as orbital period, transit depth, and stellar characteristics.`
            : `The model predicts with ${accuracy}% confidence that the provided data does not indicate the presence of an exoplanet. This conclusion is based on the analysis of key features such as orbital period, transit depth, and stellar characteristics.`}
        </p>
      </div>
    </section>
  );
}
