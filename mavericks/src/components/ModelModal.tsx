//ModalModal.tsx
import { useState, useEffect } from "react";

interface ModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (modelId: string) => void;
  isLoading?: boolean;
}

const ModelModal = ({
  isOpen,
  onClose,
  onSelectModel,
  isLoading = false,
}: ModelModalProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const models = [
    {
      id: "logistic_regression",
      name: "Logistic Regression",
      description:
        "Great for classification tasks — predicts if an exoplanet is likely a planet or not.",
    },
    {
      id: "knn",
      name: "K-Nearest Neighbors",
      description:
        "Compares input with similar past data to classify exoplanets.",
    },
    {
      id: "linear_regression",
      name: "Linear Regression",
      description:
        "Predicts continuous outcomes, such as estimating planetary size or brightness.",
    },
  ];

  const handleConfirm = () => {
    if (selectedModel) {
      onSelectModel(selectedModel);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-[#101022] text-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-center">Choose a Model</h2>
        <p className="text-sm text-gray-300 mb-6 text-center">
          Select one of the models below to run your prediction:
        </p>

        {/* Models list */}
        <div className="space-y-4 mb-6">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full text-left p-4 rounded-md transition border-2 ${
                selectedModel === model.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500 bg-[#0a0a18] hover:bg-[#1a1a2e]"
              }`}
            >
              <h3 className="font-semibold">{model.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{model.description}</p>
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-md transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedModel || isLoading}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Predicting..." : "Confirm"}
          </button>
        </div>

        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ModelModal;
