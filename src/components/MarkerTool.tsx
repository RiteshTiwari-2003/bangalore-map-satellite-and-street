import React from 'react';
import { MapPin, Plus } from 'lucide-react';

interface MarkerToolProps {
  isMarkerMode: boolean;
  onToggleMarkerMode: () => void;
}

const MarkerTool: React.FC<MarkerToolProps> = ({ isMarkerMode, onToggleMarkerMode }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <Plus className="w-4 h-4 mr-2" />
        Add Marker
      </h3>
      <button
        onClick={onToggleMarkerMode}
        className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isMarkerMode
            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <MapPin className="w-4 h-4 mr-2" />
        {isMarkerMode ? 'Cancel' : 'Place Marker'}
      </button>
      {isMarkerMode && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Click anywhere on the map to add a marker
        </p>
      )}
    </div>
  );
};

export default MarkerTool;