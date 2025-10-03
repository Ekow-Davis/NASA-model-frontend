// home.tsx
import { useState } from "react";
import Hero from "../components/hero";
import Main from "../components/main";
import HomeResults from "../components/homeResults";

interface PredictionResponse {
  prediction: "CONFIRMED" | "FALSE POSITIVE";
  confidence: number;
  model_type: string;
  training_mode: string;
}

const Home = () => {
  const [predictionResult, setPredictionResult] =
    useState<PredictionResponse | null>(null);

  // Function to update prediction result from child component
  const handlePredictionResult = (result: PredictionResponse) => {
    setPredictionResult(result);
  };

  return (
    <div>
      <Hero />
      <div className="h-[0.2px] w-full bg-gradient-to-b from-transparent to-[#101022]/90 backdrop-blur-md" />
      <Main onPredictionComplete={handlePredictionResult} />
      <HomeResults predictionResult={predictionResult} />
    </div>
  );
};

export default Home;
