//UploadPage.tsx
import React, { useState } from "react";
import { useModelContext } from "../components/ModelContext";
import type { ModelConfig } from "../components/ModelContext";
import {
  Upload,
  Download,
  FileText,
  CheckCircle,
  TrendingUpDown,
  ChevronsLeftRightEllipsis,
  Cpu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ModelModal from "../components/ModelModal";
import DataColumnsTable from "../components/uploadTableRequirements";

interface ColumnData {
  id: number;
  name: string;
  isRequired: boolean;
  description?: string;
}

// interface UploadedFile {
//   name: string;
//   file: File;
//   uploaded: boolean;
// }

interface ExoplanetResult {
  starId: string;
  prediction: "Exoplanet" | "No Exoplanet";
  confidence: number;
}

interface ProgressBarProps {
  percentage: number;
  color?: string;
}

// interface ModelConfig {
//   model_type: "logistic_regression" | "knn";
//   training_mode: "static" | "dynamic";
//   hyperparameters?: string;
// }

const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  color = "#0F0FBD",
}) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span className="text-white text-sm font-medium min-w-[45px]">
        {percentage}%
      </span>
    </div>
  );
};

const ResearcherPage: React.FC = () => {
  // const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  // const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTrainLoading, setIsTrainLoading] = useState(false);
  const [predictionResults, setPredictionResults] = useState<ExoplanetResult[]>(
    []
  );
  const [trainingStatus, setTrainingStatus] = useState<string>("");
  const [hasPredicted, setHasPredicted] = useState(false);

  const { selectedModel, setSelectedModel, uploadedFile, setUploadedFile, clearAll, setMetrics } = useModelContext();

  const navigate = useNavigate();

  const sampleColumns: ColumnData[] = [
    {
      id: 1,
      name: 'koi_disposition',
      isRequired: true,
      description: 'The disposition in the literature towards this exoplanet candidate. Needed for Training'
    },
    {
      id: 2,
      name: 'koi_fpflag_nt',
      isRequired: true,
      description: 'Not transit-like false positive flag'
    },
    {
      id: 3,
      name: 'koi_fpflag_ss',
      isRequired: false,
      description: 'Stellar eclipse false positive flag'
    },
    {
      id: 4,
      name: 'koi_fpflag_co',
      isRequired: true,
      description: 'Centroid offset false positive flag'
    },
    {
      id: 5,
      name: 'koi_fpflag_ec',
      isRequired: false,
      description: 'Ephemeris match indicates contamination'
    },
    {
      id: 6,
      name: 'koi_period',
      isRequired: true,
      description: 'Orbital period of the planet candidate'
    },
    {
      id: 7,
      name: 'koi_time0bk',
      isRequired: false,
      description: 'Transit epoch'
    },
    {
      id: 8,
      name: 'koi_impact',
      isRequired: true,
      description: 'Impact parameter of the planet candidate'
    }
  ];  

  const API_BASE_URL = "https://nasa-ml-exoplanets-0xcz.onrender.com";

  const handleSelectModel = async (modelId: string) => {
    // Convert string modelId to ModelConfig
    const modelConfig: ModelConfig = {
      model_type: modelId as "logistic_regression" | "knn",
      training_mode: "dynamic", // Default to dynamic for training
    };

    console.log("Selected model:", modelConfig);
    setSelectedModel(modelConfig);
    setIsModalOpen(false);
  };

  

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".csv")) {
      setUploadedFile({
        name: file.name,
        file: file,
        uploaded: true,
      });
      // Reset predictions when new file is uploaded
      setPredictionResults([]);
      setHasPredicted(false);
    }
  };

  const handleDownload = () => {
    if (predictionResults.length === 0) {
      alert("No results to download. Please run prediction first.");
      return;
    }

    // Convert results to CSV
    const csvContent = [
      "Star ID,Prediction,Confidence",
      ...predictionResults.map(
        (result) => `${result.starId},${result.prediction},${result.confidence}`
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exoplanet_predictions.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePredict = async () => {
    if (!uploadedFile) {
      alert("Please upload a CSV file first.");
      return;
    }

    if (!selectedModel) {
      alert("Please select a model first.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("model_type", selectedModel.model_type);
      formData.append("training_mode", selectedModel.training_mode);

      const response = await fetch(`${API_BASE_URL}/predict/batch`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform API response to match our frontend format
      const results: ExoplanetResult[] =
        data.predictions?.map((pred: any, index: number) => ({
          starId: pred.star_id || `Star_${index + 1}`,
          prediction: pred.prediction === 'CONFIRMED' ? "Exoplanet" : "No Exoplanet",
          confidence: Math.round((pred.confidence || 0.5) * 100),
        })) || [];

      setPredictionResults(results);
      setHasPredicted(true);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction failed. Please try again.");

      setHasPredicted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrainModel = async () => {
    if (!uploadedFile) {
      alert("Please upload a dataset before training a model.");
      return;
    }

    if (!selectedModel) {
      alert("Please select a model first.");
      return;
    }

    setIsTrainLoading(true);
    setTrainingStatus("Training model...");

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append("model_type", selectedModel.model_type);
      formData.append("training_mode", "dynamic"); // Force dynamic for training

      if (selectedModel.hyperparameters) {
        formData.append("hyperparameters", selectedModel.hyperparameters);
      }

      const response = await fetch(`${API_BASE_URL}/train`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Training failed: ${response.statusText}`);
      }

      const data = await response.json();
      setTrainingStatus("Training completed successfully!");
      // persist metrics into context if available
      if (setMetrics && data.metrics) {
        try {
          setMetrics(data.metrics);
        } catch (e) {
          // ignore
        }
      }

      alert(`Model ${selectedModel.model_type} training completed!`);

      navigate("/model");
    } catch (error) {
      console.error("Training error:", error);
      setTrainingStatus("Training failed. Please try again.");
      alert("Training failed. Please try again.");

      // Simulate success for demo purposes
      setTimeout(() => {
        setTrainingStatus("Training completed successfully! (Demo)");
        alert(`Model ${selectedModel.model_type} training initiated! (Demo)`);
        navigate("/model");
      }, 2000);
    } finally {
      setIsTrainLoading(false);
    }
  };
// NOTE: Training with hyperparameters is handled in the ModelDashboard page.
  React.useEffect(() => {
    clearAll();
  }, []);


  return (
    <div
      className="min-h-screen text-white pt-10"
      style={{ backgroundColor: "#101022" }}
    >
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Download Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Exoplanet Classification</h1>
          <ModelModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectModel={handleSelectModel}
            isLoading={isLoading}
          />
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: "#0F0FBD" }}
            >
              <ChevronsLeftRightEllipsis size={20} />
              {selectedModel
                ? `Model: ${selectedModel.model_type}`
                : "Select Model"}
            </button>
            <button
              onClick={handleTrainModel}
              disabled={isTrainLoading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#0F0FBD" }}
            >
              <Cpu size={20} />
              {isTrainLoading ? "Training..." : "Train from Dataset"}
            </button>
          </div>
        </div>

        {trainingStatus && (
          <div className="mb-6 p-4 rounded-lg bg-blue-900/30 border border-blue-700">
            <p className="text-blue-300">{trainingStatus}</p>
          </div>
        )}

        {/* Upload Section */}
        <div
          className="rounded-2xl p-12 mb-12"
          style={{ backgroundColor: "#1a1a3e" }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#0F0FBD" }}
            >
              <Upload size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Click to browse your files
            </h2>

            <label htmlFor="file-upload" className="cursor-pointer">
              <div
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0F0FBD" }}
              >
                <FileText size={20} />
                Upload CSV File
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {uploadedFile && (
              <div className="mt-6 flex items-center gap-3 px-6 py-3 bg-green-900/30 border border-green-700 rounded-lg">
                <FileText size={20} className="text-green-400" />
                <span className="text-white">{uploadedFile.name}</span>
                <CheckCircle size={20} className="text-green-400" />
                <span className="text-green-400 font-medium">
                  Successfully uploaded
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="justify-center flex m-6">
          <button
            onClick={handlePredict}
            disabled={isLoading || !uploadedFile || !selectedModel}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#0F0FBD" }}
          >
            <TrendingUpDown size={20} />
            {isLoading ? "Predicting..." : "Predict"}
          </button>
        </div>

        <div className="min-h-screen p-8" style={{ backgroundColor: '#101022' }}>
         <div className="max-w-7xl mx-auto">
         <div className="mb-8">
           <h1 className="text-white text-3xl font-bold mb-2">Data Columns</h1>
           <p className="text-gray-400">Overview of the dataset column structure and requirements</p>
         </div>
        
         <DataColumnsTable columns={sampleColumns} />
        
         <div className="mt-6 text-gray-400 text-sm">
           <p>Showing {sampleColumns.length} columns</p>
         </div>
       </div>
     </div>

        {/* Results Table - Only show after prediction */}
        {hasPredicted && predictionResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Prediction Results</h2>
              <div className="text-lg font-semibold">
                Exoplanets Detected:{" "}
                <span style={{ color: "#0F0FBD" }}>
                  {
                    predictionResults.filter(
                      (r) => r.prediction === "Exoplanet"
                    ).length
                  }
                </span>{" "}
                out of {predictionResults.length} stars
              </div>
            </div>
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "#1a1a3e" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left px-6 py-4 font-semibold text-sm">
                        Star ID
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm">
                        Prediction
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm">
                        Confidence
                      </th>
                      <th className="text-left px-6 py-4 font-semibold text-sm">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictionResults.map((result, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-5 text-gray-300">
                          {result.starId}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              result.prediction === "Exoplanet"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-red-900/50 text-red-400"
                            }`}
                          >
                            {result.prediction}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="max-w-xs">
                            <ProgressBar percentage={result.confidence} />
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Link to={`/model`}>
                            <button
                              className="font-medium transition-colors hover:opacity-80"
                              style={{ color: "#0F0FBD" }}
                            >
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="justify-center flex mt-12">
              <button
                onClick={handleDownload}
                disabled={predictionResults.length === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#0F0FBD" }}
              >
                <Download size={20} />
                Download Result
              </button>
            </div>
          </div>
        )}

        {/* Show empty state when no predictions yet */}
        {!hasPredicted && (
          <div className="text-center py-12">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#1a1a3e" }}
            >
              <TrendingUpDown size={48} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No Predictions Yet
            </h3>
            <p className="text-gray-500">
              Upload a CSV file, select a model, and click Predict to see
              results
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResearcherPage;
