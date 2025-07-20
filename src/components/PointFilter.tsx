import React from 'react';
import { Filter, MapPin } from 'lucide-react';

interface PointFilterProps {
  onPointTypeSelect: (type: string) => void;
}

const PointFilter: React.FC<PointFilterProps> = ({ onPointTypeSelect }) => {
  const pointTypes = [
    { type: 'Restaurant', color: '#F97316', count: 0 },
    { type: 'Hospital', color: '#EF4444', count: 0 },
    { type: 'Park', color: '#22C55E', count: 0 },
    { type: 'School', color: '#3B82F6', count: 0 },
    { type: 'Shop', color: '#8B5CF6', count: 0 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <Filter className="w-4 h-4 mr-2" />
        Point Types
      </h3>
      <div className="space-y-1">
        {pointTypes.map((pointType) => (
          <button
            key={pointType.type}
            onClick={() => onPointTypeSelect(pointType.type)}
            className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <div 
              className="w-3 h-3 rounded-full mr-3 border border-white shadow-sm"
              style={{ backgroundColor: pointType.color }}
            ></div>
            <MapPin className="w-3 h-3 mr-2 opacity-60" />
            <span className="flex-1 text-left">{pointType.type}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => onPointTypeSelect('all')}
          className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all duration-200"
        >
          <MapPin className="w-3 h-3 mr-2" />
          Show All Points
        </button>
      </div>
    </div>
  );
};

export default PointFilter;