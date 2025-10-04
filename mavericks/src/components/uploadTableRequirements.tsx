import React from 'react';

// Type Interfaces
interface ColumnData {
  id: number;
  name: string;
  isRequired: boolean;
  description?: string;
}

interface DataTableProps {
  columns: ColumnData[];
}

const DataColumnsTable: React.FC<DataTableProps> = ({ columns }) => {
  // Check if any column has a description
  const hasDescriptions = columns.some(col => col.description);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-800">
      <table className="min-w-full divide-y divide-gray-800">
        <thead style={{ backgroundColor: '#1a1a3e' }}>
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-16"
            >
              #
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Column Name
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
            >
              Value
            </th>
            {hasDescriptions && (
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Description
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800" style={{ backgroundColor: '#101022' }}>
          {columns.map((column) => (
            <tr 
              key={column.id} 
              className="hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {column.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {column.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span 
                  className={`px-3 py-1 text-xs font-medium rounded-md ${
                    column.isRequired
                      ? 'text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                  style={column.isRequired ? { backgroundColor: '#0F0FBD' } : {}}
                >
                  {column.isRequired ? 'Required' : 'Optional'}
                </span>
              </td>
              {hasDescriptions && (
                <td className="px-6 py-4 text-sm text-gray-300">
                  {column.description || '-'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage with sample data
const App: React.FC = () => {
  const sampleColumns: ColumnData[] = [
    {
      id: 1,
      name: 'koi_disposition',
      isRequired: true,
      description: 'The disposition in the literature towards this exoplanet candidate'
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

  return (
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
  );
};

export default App;