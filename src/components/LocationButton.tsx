import React from 'react';
import { Navigation } from 'lucide-react';

interface LocationButtonProps {
  onLocationRequest: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationRequest }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <button
        onClick={onLocationRequest}
        className="w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-200"
        title="Find My Location"
      >
        <Navigation className="w-4 h-4 mr-2" />
        My Location
      </button>
    </div>
  );
};

export default LocationButton;