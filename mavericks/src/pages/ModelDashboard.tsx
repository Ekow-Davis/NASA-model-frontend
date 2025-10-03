import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, HelpCircle } from 'lucide-react';

// Type Interfaces
interface MetricData {
  value: number;
  change?: number;
  isIncrease?: boolean;
}

interface PerformanceMetrics {
  accuracy: MetricData;
  precision: MetricData;
  recall: MetricData;
  f1Score: MetricData;
}

interface ConfusionMatrixData {
  trueNeg: number;
  falsePos: number;
  falseNeg: number;
  truePos: number;
}

interface FeatureImportanceItem {
  name: string;
  value: number;
}

interface TrainingHistoryPoint {
  iteration: number;
  f1Score: number;
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

interface LoadingSpinnerProps {
  onComplete?: () => void;
}

const styles = `
@keyframes spin-slowest {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-slower {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes spin-fastest {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin-slowest {
  animation: spin-slowest 12s linear infinite;
}
.animate-spin-slower {
  animation: spin-slower 10s linear infinite;
}
.animate-spin-fastest {
  animation: spin-fastest 7s linear infinite;
}
`;

const StyleInjector = () => <style>{styles}</style>;

// Loading Component
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ onComplete }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let currentPercentage = 0;

    const updatePercentage = () => {
      if (currentPercentage < 100) {
        const maxJump =
          currentPercentage < 90
            ? Math.random() * 8 + 1
            : Math.random() * 2 + 0.5;
        currentPercentage = Math.min(currentPercentage + maxJump, 100);

        setPercentage(Math.floor(currentPercentage));

        const delay =
          currentPercentage < 90
            ? Math.random() * 400 + 200
            : Math.random() * 100 + 50;


        setTimeout(updatePercentage, delay);
      } else {
        setTimeout(() => {
          onComplete?.();   
        }, 500);
      }
    };
    updatePercentage();
  }, [onComplete]);

  return (
    <div className="fixed bg-black/80 inset-0 flex items-center justify-center z-50">
      <div className="relative w-80 h-80">
        {/* Orbital paths */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-32 h-32 border border-white rounded-full opacity-30"></div>
          <div className="absolute w-48 h-48 border border-white rounded-full opacity-30"></div>
          <div className="absolute w-64 h-64 border border-white rounded-full opacity-30"></div>
        </div>

        {/* Central sun with percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50">
            <span className="text-gray-900 font-bold text-lg">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Orbiting planets */}
        {/* Innermost orbit - grey (fastest) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 relative animate-spin-fastest">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-3 h-3 bg-gray-400 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Middle orbit - orange (medium speed) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 relative animate-spin-slower">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-3 h-3 bg-orange-700 rounded-full shadow-lg shadow-orange-500/50"></div>
          </div>
        </div>

        {/* Outer orbit - blue (slowest) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 relative animate-spin-slowest">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 
            w-5 h-5 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Metric Card Component
const MetricCard: React.FC<{ title: string; metric: MetricData }> = ({ title, metric }) => (
  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className="text-white text-4xl font-bold mb-2">{metric.value.toFixed(1)}%</p>
    {metric.change !== undefined && (
      <div className={`flex items-center gap-1 text-sm font-medium ${metric.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {metric.isIncrease ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>{metric.isIncrease ? '+' : ''}{metric.change.toFixed(1)}%</span>
      </div>
    )}
  </div>
);

// Confusion Matrix Component
const ConfusionMatrix: React.FC<{ data: ConfusionMatrixData }> = ({ data }) => {
  const getColor = (value: number) => {
    if (value >= 1000) return '#0F0FBD';
    if (value >= 500) return '#141483';
    if (value >= 100) return '#171767';
    return '#19194A';
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white text-lg font-semibold mb-4">Confusion Matrix</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg p-6 flex flex-col items-center justify-center" style={{ backgroundColor: getColor(data.trueNeg) }}>
          <p className="text-white text-4xl font-bold mb-1">{data.trueNeg}</p>
          <p className="text-gray-300 text-sm">True Neg</p>
        </div>
        <div className="rounded-lg p-6 flex flex-col items-center justify-center" style={{ backgroundColor: getColor(data.falsePos) }}>
          <p className="text-white text-4xl font-bold mb-1">{data.falsePos}</p>
          <p className="text-gray-300 text-sm">False Pos</p>
        </div>
        <div className="rounded-lg p-6 flex flex-col items-center justify-center" style={{ backgroundColor: getColor(data.falseNeg) }}>
          <p className="text-white text-4xl font-bold mb-1">{data.falseNeg}</p>
          <p className="text-gray-300 text-sm">False Neg</p>
        </div>
        <div className="rounded-lg p-6 flex flex-col items-center justify-center" style={{ backgroundColor: getColor(data.truePos) }}>
          <p className="text-white text-4xl font-bold mb-1">{data.truePos}</p>
          <p className="text-gray-300 text-sm">True Pos</p>
        </div>
      </div>
    </div>
  );
};

// Feature Importance Component
const FeatureImportance: React.FC<{ features: FeatureImportanceItem[] }> = ({ features }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(features.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(features.map(f => f.value));
    }, 100);
    return () => clearTimeout(timer);
  }, [features]);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white text-lg font-semibold mb-4">Feature Importance</h3>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm">{feature.name}</span>
              <span className="text-white font-medium">{feature.value.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${animatedValues[index] * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Training History Component
const TrainingHistory: React.FC<{ history: TrainingHistoryPoint[] }> = ({ history }) => {
  const [visiblePoints, setVisiblePoints] = useState<number>(0);

  useEffect(() => {
    if (visiblePoints < history.length) {
      const timer = setTimeout(() => {
        setVisiblePoints(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visiblePoints, history.length]);

  const maxF1 = Math.max(...history.map(h => h.f1Score));
  const minF1 = Math.min(...history.map(h => h.f1Score));
  const range = maxF1 - minF1;

  const getY = (f1Score: number) => {
    return 200 - ((f1Score - minF1) / range) * 180;
  };

  const pathPoints = history.slice(0, visiblePoints).map((point, index) => {
    const x = (index / (history.length - 1)) * 300;
    const y = getY(point.f1Score);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 h-full">
      <h3 className="text-white text-lg font-semibold mb-4">Training History</h3>
      <div className="relative w-full h-48">
        <svg viewBox="0 0 300 200" className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0F0FBD', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d={pathPoints}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {history.slice(0, visiblePoints).map((point, index) => {
            const x = (index / (history.length - 1)) * 300;
            const y = getY(point.f1Score);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#0F0FBD"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// Slider Control Component
const SliderControl: React.FC<SliderControlProps> = ({ label, value, min, max, step, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      setInputValue(value.toString());
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-white font-medium">{label}</label>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={min}
          max={max}
          step={step}
          className="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 w-24 text-right"
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #0F0FBD 0%, #0F0FBD ${((value - min) / (max - min)) * 100}%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

// Main Component
const ModelPerformanceTracking: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('Model 1');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [regularization, setRegularization] = useState<number>(0.01);
  const [maxIterations, setMaxIterations] = useState<number>(1000);
  
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    accuracy:   { value: 92.5, change: 0, isIncrease: true },
    precision:  { value: 88.2, change: 0, isIncrease: true },
    recall:     { value: 90.1, change: 0, isIncrease: true },
    f1Score:    { value: 89.1, change: 0, isIncrease: true }
  });

  const [trainingHistory, setTrainingHistory] = useState<TrainingHistoryPoint[]>([
    { iteration: 1, f1Score: 89.1 }
  ]);

  const confusionData: ConfusionMatrixData = {
    trueNeg: 1250,
    falsePos: 50,
    falseNeg: 80,
    truePos: 850
  };

  const featureImportance: FeatureImportanceItem[] = [
    { name: 'Stellar Radius', value: 0.92 },
    { name: 'Transit Depth', value: 0.78 },
    { name: 'Orbital Period', value: 0.65 },
    { name: 'Planet Temp.', value: 0.47 }
  ];

  const handleApplyChanges = () => {
    setIsLoading(true);
  };
    
    {isLoading && (
    <LoadingSpinner
      onComplete={() => {
      const prevMetrics = { ...metrics };
      
      const newMetrics: PerformanceMetrics = {
        accuracy: {
          value: Math.min(99, metrics.accuracy.value + 3),
          change: 0,
          isIncrease: true
        },
        precision: {
          value: Math.min(99, metrics.precision.value + 3),
          change: 0,
          isIncrease: true
        },
        recall: {
          value: Math.max(70, metrics.recall.value - 3),
          change: 0,
          isIncrease: false
        },
        f1Score: {
          value: Math.min(99, metrics.f1Score.value + 3),
          change: 0,
          isIncrease: true
        }
      };

      newMetrics.accuracy.change = ((newMetrics.accuracy.value - prevMetrics.accuracy.value) / prevMetrics.accuracy.value) * 100;
      newMetrics.precision.change = ((newMetrics.precision.value - prevMetrics.precision.value) / prevMetrics.precision.value) * 100;
      newMetrics.recall.change = ((newMetrics.recall.value - prevMetrics.recall.value) / prevMetrics.recall.value) * 100;
      newMetrics.f1Score.change = ((newMetrics.f1Score.value - prevMetrics.f1Score.value) / prevMetrics.f1Score.value) * 100;

      setMetrics(newMetrics);
      
      setTrainingHistory(prev => [
        ...prev,
        { iteration: prev.length + 1, f1Score: newMetrics.f1Score.value }
      ]);
      
      setIsLoading(false);
    }}
  />
)}

  const handleResetToDefault = () => {
    setRegularization(0);
    setMaxIterations(0);
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#101022' }}>
      
      <StyleInjector />

      {isLoading && <LoadingSpinner onComplete={() => setIsLoading(false)} />}
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F0FBD' }}>
              <div className="w-6 h-6 border-2 border-white rounded"></div>
            </div>
            <span className="text-xl font-semibold">Exoplanet AI</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Overview</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Data</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Model</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Training</a>
            <a href="#" className="text-white font-medium">Evaluation</a>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800">
              <HelpCircle size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-teal-600 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-sm font-medium">U</div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Model Selector */}
        <div className="mb-2">
          <h1 className="text-4xl font-bold">Model Performance Tracking</h1>
        </div>
        <div className="flex items-start justify-between mb-8">
          <p className="text-gray-400">Monitor and adjust the performance of the Exoplanet Classification AI model.</p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <span className="text-white">{selectedModel}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden min-w-[140px] z-10">
                {['Model 1', 'Model 2', 'Model 3'].map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard title="Accuracy" metric={metrics.accuracy} />
            <MetricCard title="Precision" metric={metrics.precision} />
            <MetricCard title="Recall" metric={metrics.recall} />
            <MetricCard title="F1-Score" metric={metrics.f1Score} />
          </div>
        </div>

        {/* Visualizations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Visualizations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ConfusionMatrix data={confusionData} />
            <FeatureImportance features={featureImportance} />
            <TrainingHistory history={trainingHistory} />
          </div>
        </div>

        {/* Model Controls */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Model Controls</h2>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <SliderControl
                label="Regularization Strength"
                value={regularization}
                min={0}
                max={1}
                step={0.01}
                onChange={setRegularization}
              />
              <SliderControl
                label="Max Iterations"
                value={maxIterations}
                min={0}
                max={1000}
                step={10}
                onChange={setMaxIterations}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleResetToDefault}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-750 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={handleApplyChanges}
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#0F0FBD' }}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0F0FBD;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0F0FBD;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

      `}</style>
    </div>
  );
};

export default ModelPerformanceTracking;