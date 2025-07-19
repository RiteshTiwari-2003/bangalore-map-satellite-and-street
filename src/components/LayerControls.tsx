import React from 'react';
import { Layers, MapPin, Route } from 'lucide-react';

interface LayerControlsProps {
  showPointsLayer: boolean;
  showRoutesLayer: boolean;
  onPointsLayerToggle: (show: boolean) => void;
  onRoutesLayerToggle: (show: boolean) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({
  showPointsLayer,
  showRoutesLayer,
  onPointsLayerToggle,
  onRoutesLayerToggle,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
        <Layers className="w-4 h-4 mr-2" />
        Map Layers
      </h3>
      <div className="space-y-3">
        {/* Points Layer Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Points of Interest</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showPointsLayer}
              onChange={(e) => onPointsLayerToggle(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
              showPointsLayer ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                showPointsLayer ? 'translate-x-5' : 'translate-x-1'
              } mt-1`}></div>
            </div>
          </label>
        </div>

        {/* Routes Layer Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Route className="w-4 h-4 mr-2 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Routes & Zones</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showRoutesLayer}
              onChange={(e) => onRoutesLayerToggle(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
              showRoutesLayer ? 'bg-blue-600' : 'bg-gray-300'
            }`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                showRoutesLayer ? 'translate-x-5' : 'translate-x-1'
              } mt-1`}></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default LayerControls;