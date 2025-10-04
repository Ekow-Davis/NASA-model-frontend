// components/homeResults.tsx
import { Search, CircleX } from "lucide-react";
interface PredictionResult {
  prediction: "CONFIRMED" | "FALSE POSITIVE";
  confidence: number;
  model_type: string;
  training_mode: string;
}

interface HomeResultsProps {
  predictionResult: PredictionResult | null;
}

export default function HomeResults({ predictionResult }: HomeResultsProps) {
  if (!predictionResult) {
    return null;
  }

  const isExoplanet = predictionResult.prediction === "CONFIRMED";
  const accuracy = Math.round(predictionResult.confidence * 100);

  return (
    <section
      id="results"
      className="font-orbit min-h-screen bg-[#0a0a18] text-white px-8 pt-16"
    >
      <h1 className="text-3xl font-bold text-center mb-10">
        prediction result
      </h1>

      <div className="bg-[#101022] text-white rounded-lg shadow-lg max-w-3xl mx-auto p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isExoplanet ? "bg-[#101041]" : "bg-red-200/40"
            }`}
          >
            {isExoplanet ? (
              <Search className="text-blue-600 text-3xl" />
            ) : (
              <CircleX className="text-red-600 text-3xl" />
            )}
          </div>
        </div>

        {/* Result Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isExoplanet ? "Exoplanet Detected" : "Not an Exoplanet"}
        </h2>

        {/* Model Info */}
        <div className="text-center mb-6 text-sm text-gray-300">
          Model: {predictionResult.model_type.replace(/_/g, " ").toUpperCase()}{" "}
          | Mode: {predictionResult.training_mode.toUpperCase()}
        </div>

        {/* Accuracy Bar */}
        <div className="mb-2 flex justify-between text-sm font-medium text-gray-300">
          <span>confidence</span>
          <span>{accuracy}%</span>
        </div>
        <div className="w-full bg-[#101041] rounded-full h-[4px] mb-8">
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
            ? `The ${predictionResult.model_type.replace(
                /_/g,
                " "
              )} model predicts with ${accuracy}% confidence that the provided data indicates the presence of an exoplanet. This conclusion is based on the analysis of key features inputted above.`
            : `The ${predictionResult.model_type.replace(
                /_/g,
                " "
              )} model predicts with ${accuracy}% confidence that the provided data does not indicate the presence of an exoplanet. This conclusion is based on the analysis of key features inputted above.`}
        </p>
      </div>
    </section>
  );
}
