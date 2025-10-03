import { useState } from "react";
import ModelModal from "../components/ModelModal";

interface FormData {
  koi_period: number | null;
  koi_duration: number | null;
  koi_depth: number | null;
  koi_model_snr: number | null;
  koi_steff: number | null;
  koi_slogg: number | null;
  koi_srad: number | null;
  koi_kepmag: number | null;
}

export interface PredictionResponse {
  prediction: "CONFIRMED" | "FALSE POSITIVE";
  confidence: number;
  model_type: string;
  training_mode: string;
}

interface MainProps {
  onPredictionComplete: (result: PredictionResponse) => void;
}

const Main = ({ onPredictionComplete }: MainProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    koi_period: null,
    koi_duration: null,
    koi_depth: null,
    koi_model_snr: null,
    koi_steff: null,
    koi_slogg: null,
    koi_srad: null,
    koi_kepmag: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] =
    useState<PredictionResponse | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === "" ? null : parseFloat(value),
    }));
  };

  const handleSelectModel = async (modelId: string) => {
    console.log("Selected model:", modelId);

    // Validate all fields are filled
    const hasEmptyFields = Object.values(formData).some(
      (value) => value === null
    );
    if (hasEmptyFields) {
      alert("Please fill in all fields before predicting.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://nasa-ml-exoplanets-0xcz.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model_type: modelId,
            training_mode: "dynamic",
            data: formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResponse = await response.json();
      setPredictionResult(result);
      onPredictionComplete(result); // Call the parent callback

      // Close modal
      setIsModalOpen(false);

      // Scroll to results after a short delay to ensure state update
      setTimeout(() => {
        const resultsElement = document.getElementById("results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Error making prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(
      (value) => value !== null && !isNaN(value)
    );
  };

  return (
    <section
      id="main"
      className="font-orbit min-h-screen bg-[#101022] text-white px-8 py-16"
    >
      <h1 className="text-2xl font-bold text-center">exoplanet data input</h1>
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
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_period", e.target.value)}
              placeholder="e.g., 15.2"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              transit duration ( hours )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                handleInputChange("koi_duration", e.target.value)
              }
              placeholder="e.g., 3.8"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              transit depth ( parts per million )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_depth", e.target.value)}
              placeholder="e.g., 180.5"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              signal-to-noise ratio ( snr )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                handleInputChange("koi_model_snr", e.target.value)
              }
              placeholder="e.g., 12.3"
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
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_steff", e.target.value)}
              placeholder="e.g., 5200.0"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              star surface gravity ( log cm/s² )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_slogg", e.target.value)}
              placeholder="e.g., 4.5"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              star size ( solar radii )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_srad", e.target.value)}
              placeholder="e.g., 0.9"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold mb-3">
              apparent brightness ( magnitude )
            </h3>
            <input
              type="number"
              step="any"
              className="bg-[#0a0a18] w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleInputChange("koi_kepmag", e.target.value)}
              placeholder="e.g., 13.2"
            />
          </div>
        </div>
      </div>

      {/* Form validation feedback */}
      {!isFormValid() && (
        <div className="text-center mt-4">
          <p className="text-yellow-500 text-sm">
            Please fill in all fields with valid numbers to enable prediction.
          </p>
        </div>
      )}

      {/* Submit button */}
      <div className="text-center mt-12">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isLoading || !isFormValid()}
          className="px-6 py-2 bg-[#003c92] w-44 hover:bg-blue-700 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Predicting..." : "Predict Now"}
        </button>
      </div>

      {/* Modal */}
      <ModelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectModel={handleSelectModel}
        isLoading={isLoading}
      />
    </section>
  );
};

export default Main;
