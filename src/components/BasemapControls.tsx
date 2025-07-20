import React from 'react';
import { Map, Satellite } from 'lucide-react';

interface BasemapControlsProps {
  basemap: 'street' | 'satellite';
  onBasemapChange: (basemap: 'street' | 'satellite') => void;
}

const BasemapControls: React.FC<BasemapControlsProps> = ({ basemap, onBasemapChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <Map className="w-4 h-4 mr-2" />
        Base Map
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onBasemapChange('street')}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            basemap === 'street'
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
              : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
          }`}
        >
          <Map className="w-4 h-4 mr-2" />
          Street
        </button>
        <button
          onClick={() => onBasemapChange('satellite')}
          className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            basemap === 'satellite'
              ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
              : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
          }`}
        >
          <Satellite className="w-4 h-4 mr-2" />
          Satellite
        </button>
      </div>
    </div>
  );
};

export default BasemapControls;