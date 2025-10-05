"use client";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface ModelConfig {
  model_type: "logistic_regression" | "knn" | "linear_regression";
  training_mode: "dynamic" | "static";
  hyperparameters?: string; // Add this optional property
}

export interface MetricData {
  value: number;
  change?: number;
  isIncrease?: boolean;
}

export interface PerformanceMetrics {
  accuracy: MetricData;
  precision: MetricData;
  recall: MetricData;
  f1Score: MetricData;
}

interface UploadedFile {
  name: string;
  file: File;
  uploaded: boolean;
}

interface ModelContextType {
  selectedModel: ModelConfig | null;
  setSelectedModel: (model: ModelConfig | null) => void;
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  clearAll: () => void; // reset when going back to /researcher
  metrics: PerformanceMetrics | null;
  setMetrics: (m: PerformanceMetrics | null) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export const useModelContext = () => {
  const ctx = useContext(ModelContext);
  if (!ctx) throw new Error("useModelContext must be used within ModelProvider");
  return ctx;
};

export const ModelProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  const clearAll = () => {
    setSelectedModel(null);
    setUploadedFile(null);
  };

  return (
    <ModelContext.Provider
      value={{ selectedModel, setSelectedModel, uploadedFile, setUploadedFile, clearAll, metrics, setMetrics }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default ModelContext;