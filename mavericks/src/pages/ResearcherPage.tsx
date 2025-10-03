import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UploadedFile {
  name: string;
  uploaded: boolean;
}

interface ExoplanetResult {
  starId: string;
  prediction: 'Exoplanet' | 'No Exoplanet';
  confidence: number;
}

interface ProgressBarProps {
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color = '#0F0FBD' }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
      <span className="text-white text-sm font-medium min-w-[45px]">{percentage}%</span>
    </div>
  );
};

const ResearcherPage: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  // const [filesProcessed] = useState<number>(12);
  // const [exoplanetsDetected] = useState<number>(5);

  const results: ExoplanetResult[] = [
    { starId: 'KIC 8462852', prediction: 'Exoplanet', confidence: 85 },
    { starId: 'KIC 6922044', prediction: 'No Exoplanet', confidence: 92 },
    { starId: 'KIC 1145123', prediction: 'Exoplanet', confidence: 78 },
    { starId: 'KIC 1026480', prediction: 'No Exoplanet', confidence: 89 },
    { starId: 'KIC 3427720', prediction: 'Exoplanet', confidence: 95 }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setUploadedFile({
        name: file.name,
        uploaded: true
      });
    }
  };

  const handleDownload = () => {
    console.log('Downloading results...');
  };

  return (
    <div className="min-h-screen text-white pt-10" style={{ backgroundColor: '#101022' }}>
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Download Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Exoplanet Classification</h1>
          <button
            // onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#0F0FBD' }}
          >
            <Download size={20} />
            Train from Dataset
          </button>
        </div>

        {/* Upload Section */}
        <div className="rounded-2xl p-12 mb-12" style={{ backgroundColor: '#1a1a3e' }}>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#0F0FBD' }}>
              <Upload size={32} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Drag and drop Kepler data CSVs here</h2>
            <p className="text-gray-400 mb-6">Or click to browse your files</p>
            
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#0F0FBD' }}>
                <FileText size={20} />
                Upload Files
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
                <span className="text-green-400 font-medium">Successfully uploaded</span>
              </div>
            )}
          </div>
        </div>
        <div className='justify-center flex m-6'>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#0F0FBD' }}
          >
            <Download size={20} />
            Download Result
          </button>
        </div>
        

        {/* Batch Results Summary */}
        {/* <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Batch Results Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl p-6" style={{ backgroundColor: '#1a1a3e' }}>
              <p className="text-gray-400 text-sm mb-2">Files Processed</p>
              <p className="text-5xl font-bold">{filesProcessed}</p>
            </div>
            <div className="rounded-xl p-6" style={{ backgroundColor: '#1a1a3e' }}>
              <p className="text-gray-400 text-sm mb-2">Exoplanets Detected</p>
              <p className="text-5xl font-bold" style={{ color: '#0F0FBD' }}>{exoplanetsDetected}</p>
            </div>
          </div>
        </div> */}

        {/* Results Table */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Results Table</h2>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#1a1a3e' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-6 py-4 font-semibold text-sm">Star ID</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm">Prediction</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm">Confidence</th>
                    <th className="text-left px-6 py-4 font-semibold text-sm">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-5 text-gray-300">{result.starId}</td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            result.prediction === 'Exoplanet'
                              ? 'bg-green-900/50 text-green-400'
                              : 'bg-red-900/50 text-red-400'
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
                        {/* /results/${result.starId} */}
                        <Link to={`/model`}>
                          <button className="font-medium transition-colors hover:opacity-80" style={{ color: '#0F0FBD' }}>
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
        </div>

        <div className='justify-center flex mt-12'>
          <button
            // onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#0F0FBD' }}
          >
            <Download size={20} />
            Download Result
          </button>
          
        </div>
      </main>
    </div>
  );
};

export default ResearcherPage;