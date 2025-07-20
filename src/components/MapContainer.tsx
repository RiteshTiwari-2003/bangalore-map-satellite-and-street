import React, { useState, useRef, useEffect } from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { LatLngTuple, Icon, LatLng, LeafletMouseEvent } from 'leaflet';
import { MapPin,  } from 'lucide-react';
import { GeoJSONData, GeoJSONFeature } from '../types/geojson';
import LayerControls from './LayerControls';
import BasemapControls from './BasemapControls';
import MarkerTool from './MarkerTool';
import LocationButton from './LocationButton';
import PointFilter from './PointFilter';

// Custom marker icon
const customMarkerIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5QzkuNSA3LjYyIDEwLjYyIDYuNSAxMiA2LjVDMTMuMzggNi41IDE0LjUgNy42MiAxNC41IDlDMTQuNSAxMC4zOCAxMy4zOCAxMS41IDEyIDExLjVaIiBmaWxsPSIjM0I4MkY2Ii8+Cjwvc3ZnPgo=',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface UserMarker {
  id: string;
  position: LatLng;
  name: string;
}

// Component to handle map clicks for marker placement
function MapClickHandler({ 
  isMarkerMode, 
  onMarkerAdd 
}: { 
  isMarkerMode: boolean; 
  onMarkerAdd: (position: LatLng) => void; 
}) {
  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      if (isMarkerMode) {
        onMarkerAdd(e.latlng);
      }
    },
  });
  return null;
}

const MapContainer: React.FC = () => {
  const [center] = useState<LatLngTuple>([12.9716, 77.5946]); // Bangalore coordinates
  const [zoom] = useState(11);
  const [basemap, setBasemap] = useState<'street' | 'satellite'>('street');
  const [showPointsLayer, setShowPointsLayer] = useState(true);
  const [showRoutesLayer, setShowRoutesLayer] = useState(true);
  const [pointsData, setPointsData] = useState<GeoJSONData | null>(null);
  const [routesData, setRoutesData] = useState<GeoJSONData | null>(null);
  const [userMarkers, setUserMarkers] = useState<UserMarker[]>([]);
  const [isMarkerMode, setIsMarkerMode] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const mapRef = useRef<any>(null);

  // Load GeoJSON data on component mount
  useEffect(() => {
    // Complete points data from the provided GeoJSON
    const completePointsData: GeoJSONData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 98",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.571702, 12.9605]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 29",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.59263, 12.901603]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 33",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.565654, 12.939399]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 69",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.662974, 12.972086]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 30",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.514383, 12.999554]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 100",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.68128, 12.967844]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 85",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.518668, 12.931364]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 2",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.634071, 12.99938]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 55",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.620044, 12.921826]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 7",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.571083, 12.996882]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 34",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.686138, 12.911309]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 20",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.664308, 12.99074]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 17",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.640437, 12.986415]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 75",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.655362, 12.925525]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 14",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.614725, 12.967249]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 94",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.577706, 12.975282]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 12",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.516394, 12.997462]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 59",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.678844, 12.949165]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 55",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.546585, 12.947896]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 35",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.529785, 12.998565]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 37",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.546811, 12.989837]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 76",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.67791, 12.909599]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 3",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.656113, 12.944684]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 5",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.682555, 12.910744]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 61",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.634446, 12.952902]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 63",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.59837, 12.97638]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 68",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.501088, 12.905176]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 93",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.600929, 12.917279]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 78",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.508245, 12.942094]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 4",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.519319, 12.927147]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 36",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.670179, 12.91705]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 100",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.581372, 12.923562]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 78",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.532552, 12.998579]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 64",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.607935, 12.92134]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 71",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.515242, 12.927008]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 91",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.603943, 12.955457]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 84",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.528828, 12.913848]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 83",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.570148, 12.993042]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 88",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.546134, 12.987281]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 25",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.584686, 12.978341]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 82",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.52988, 12.962067]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 11",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.585457, 12.927066]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 53",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.614368, 12.963273]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 94",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.667195, 12.967786]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 37",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.5144, 12.930528]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 52",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.62504, 12.922091]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 68",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.623791, 12.983905]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 93",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.567224, 12.917664]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 98",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.591333, 12.952664]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 21",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.617337, 12.919052]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 46",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.58793, 12.967183]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 86",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.619757, 12.957315]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 13",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.520021, 12.983347]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 39",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.614767, 12.994286]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 31",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.682693, 12.915836]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 62",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.667157, 12.940604]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 14",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.610432, 12.978108]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 65",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.569533, 12.985094]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 77",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.698876, 12.956206]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 48",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.667921, 12.920702]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 85",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.68457, 12.928916]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 100",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.597962, 12.991543]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 8",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.629386, 12.983323]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 17",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.589008, 12.937875]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 10",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.680715, 12.999568]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 58",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.663352, 12.958678]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 44",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.673772, 12.99211]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 3",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.688093, 12.951709]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 14",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.586925, 12.995058]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 30",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.547442, 12.997832]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 32",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.630459, 12.927915]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 20",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.644103, 12.928603]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Beta 5",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.585844, 12.998503]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 21",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.502645, 12.938515]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 51",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.659733, 12.959056]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 93",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.683532, 12.955215]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 99",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.531974, 12.98501]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 13",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.545141, 12.948965]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 97",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.557784, 12.970653]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 93",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.512155, 12.902798]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 94",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.63684, 12.960512]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 49",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.525831, 12.999337]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 48",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.561431, 12.991555]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Sigma 1",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.624471, 12.987546]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zeta 59",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.696531, 12.990406]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 43",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.617759, 12.926546]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 13",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.696151, 12.992759]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 70",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.507725, 12.997971]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 24",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.570531, 12.902321]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 82",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.590257, 12.927957]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 3",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.575666, 12.908742]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 63",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.657617, 12.927856]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Omega 56",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.618922, 12.930427]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Theta 48",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.60318, 12.997471]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Nova 3",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.544004, 12.989111]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 52",
            "type": "Hospital"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.583018, 12.958776]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Delta 12",
            "type": "Shop"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.571161, 12.984667]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Alpha 57",
            "type": "Restaurant"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.527508, 12.907783]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Epsilon 91",
            "type": "School"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.694524, 12.958751]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Gamma 36",
            "type": "Park"
          },
          "geometry": {
            "type": "Point",
            "coordinates": [77.655828, 12.997013]
          }
        }
      ]
    };

    // Complete routes and zones data from the provided GeoJSON
    const completeRoutesData: GeoJSONData = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "name": "Route 1",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.67164884519975, 12.98720203203536],
              [77.68164884519976, 12.997202032035359],
              [77.69164884519975, 12.99220203203536]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 2",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.52594403754513, 12.92207584424744],
              [77.53594403754514, 12.93207584424744],
              [77.54594403754513, 12.92707584424744]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 3",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.54674784116303, 12.922693196583054],
              [77.55674784116303, 12.932693196583054],
              [77.56674784116302, 12.927693196583055]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 4",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.61109042619503, 12.9983608495079],
              [77.62109042619504, 13.0083608495079],
              [77.63109042619503, 13.003360849507901]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 5",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.59111779589837, 12.991988711797207],
              [77.60111779589838, 13.001988711797207],
              [77.61111779589837, 12.996988711797208]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 6",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.54316600541593, 12.983488948588636],
              [77.55316600541593, 12.993488948588636],
              [77.56316600541592, 12.988488948588637]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 7",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.64536041093938, 12.907103665140715],
              [77.65536041093938, 12.917103665140715],
              [77.66536041093937, 12.912103665140716]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 8",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.63516518307458, 12.950965568103204],
              [77.64516518307458, 12.960965568103203],
              [77.65516518307457, 12.955965568103204]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 9",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.69513410504226, 12.915223328428098],
              [77.70513410504226, 12.925223328428098],
              [77.71513410504225, 12.920223328428099]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Route 10",
            "type": "Route"
          },
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [77.55093035956237, 12.928686675242398],
              [77.56093035956238, 12.938686675242398],
              [77.57093035956237, 12.933686675242399]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 1",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.61133249192163, 12.960131537643486],
                [77.61633249192163, 12.960131537643486],
                [77.61633249192163, 12.965131537643487],
                [77.61133249192163, 12.965131537643487],
                [77.61133249192163, 12.960131537643486]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 2",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.5571879993755, 12.92573932839298],
                [77.5621879993755, 12.92573932839298],
                [77.5621879993755, 12.930739328392981],
                [77.5571879993755, 12.930739328392981],
                [77.5571879993755, 12.92573932839298]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 3",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.58843222651838, 12.966547283725562],
                [77.59343222651837, 12.966547283725562],
                [77.59343222651837, 12.971547283725563],
                [77.58843222651838, 12.971547283725563],
                [77.58843222651838, 12.966547283725562]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 4",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.55614218371927, 12.959262139701329],
                [77.56114218371927, 12.959262139701329],
                [77.56114218371927, 12.96426213970133],
                [77.55614218371927, 12.96426213970133],
                [77.55614218371927, 12.959262139701329]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 5",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.58005466988975, 12.957901854652617],
                [77.58505466988974, 12.957901854652617],
                [77.58505466988974, 12.962901854652618],
                [77.58005466988975, 12.962901854652618],
                [77.58005466988975, 12.957901854652617]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 6",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.58366675020213, 12.924439209210563],
                [77.58866675020212, 12.924439209210563],
                [77.58866675020212, 12.929439209210564],
                [77.58366675020213, 12.929439209210564],
                [77.58366675020213, 12.924439209210563]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 7",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.55789021741755, 12.988666228305435],
                [77.56289021741755, 12.988666228305435],
                [77.56289021741755, 12.993666228305436],
                [77.55789021741755, 12.993666228305436],
                [77.55789021741755, 12.988666228305435]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 8",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.66268439346703, 12.985947195266355],
                [77.66768439346703, 12.985947195266355],
                [77.66768439346703, 12.990947195266356],
                [77.66268439346703, 12.990947195266356],
                [77.66268439346703, 12.985947195266355]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 9",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.54061408417657, 12.988956838337355],
                [77.54561408417656, 12.988956838337355],
                [77.54561408417656, 12.993956838337356],
                [77.54061408417657, 12.993956838337356],
                [77.54061408417657, 12.988956838337355]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 10",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.58523958109795, 12.907243648430136],
                [77.59023958109795, 12.907243648430136],
                [77.59023958109795, 12.912243648430136],
                [77.58523958109795, 12.912243648430136],
                [77.58523958109795, 12.907243648430136]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 11",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.61267584634308, 12.972421666872588],
                [77.61767584634308, 12.972421666872588],
                [77.61767584634308, 12.977421666872589],
                [77.61267584634308, 12.977421666872589],
                [77.61267584634308, 12.972421666872588]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 12",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.51983983890717, 12.932510962310284],
                [77.52483983890717, 12.932510962310284],
                [77.52483983890717, 12.937510962310284],
                [77.51983983890717, 12.937510962310284],
                [77.51983983890717, 12.932510962310284]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 13",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.61423367671993, 12.91834270662244],
                [77.61923367671993, 12.91834270662244],
                [77.61923367671993, 12.92334270662244],
                [77.61423367671993, 12.92334270662244],
                [77.61423367671993, 12.91834270662244]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 14",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.62616963024998, 12.91528488590562],
                [77.63116963024997, 12.91528488590562],
                [77.63116963024997, 12.920284885905621],
                [77.62616963024998, 12.920284885905621],
                [77.62616963024998, 12.91528488590562]
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {
            "name": "Zone 15",
            "type": "Area"
          },
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [77.51179063092732, 12.969053968728934],
                [77.51679063092732, 12.969053968728934],
                [77.51679063092732, 12.974053968728935],
                [77.51179063092732, 12.974053968728935],
                [77.51179063092732, 12.969053968728934]
              ]
            ]
          }
        }
      ]
    };

    setPointsData(completePointsData);
    setRoutesData(completeRoutesData);
  }, []);

  // Style functions for different feature types
  const getPointStyle = (feature: GeoJSONFeature) => {
    const type = feature.properties.type;
    const colors: { [key: string]: string } = {
      'Restaurant': '#F97316', // Orange
      'Hospital': '#EF4444', // Red
      'Park': '#22C55E', // Green
      'School': '#3B82F6', // Blue
      'Shop': '#8B5CF6' // Purple
    };
    
    return {
      radius: 8,
      fillColor: colors[type] || '#6B7280',
      color: '#FFFFFF',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };
  };

  const getRouteStyle = (feature: GeoJSONFeature) => {
    if (feature.geometry.type === 'LineString') {
      return {
        color: '#DC2626',
        weight: 4,
        opacity: 0.8
      };
    } else if (feature.geometry.type === 'Polygon') {
      return {
        fillColor: '#3B82F6',
        fillOpacity: 0.3,
        color: '#1D4ED8',
        weight: 2,
        opacity: 0.8
      };
    }
    return {};
  };

  // Handle marker addition
  const handleMarkerAdd = (position: LatLng) => {
    const newMarker: UserMarker = {
      id: Date.now().toString(),
      position,
      name: `Custom Marker ${userMarkers.length + 1}`
    };
    setUserMarkers([...userMarkers, newMarker]);
    setIsMarkerMode(false);
  };

  // Get user location
  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = new LatLng(position.coords.latitude, position.coords.longitude);
          setUserLocation(userPos);
          if (mapRef.current) {
            mapRef.current.setView(userPos, 15);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check location permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle point type selection and fly to first occurrence
  const handlePointTypeSelect = (type: string) => {
    if (!pointsData || !mapRef.current) return;

    if (type === 'all') {
      // Fly to center of all points
      mapRef.current.setView([12.9716, 77.5946], 11);
      return;
    }

    // Find first point of selected type
    const targetPoint = pointsData.features.find(
      feature => feature.properties.type === type
    );

    if (targetPoint && targetPoint.geometry.type === 'Point') {
      const [lng, lat] = targetPoint.geometry.coordinates;
      mapRef.current.flyTo([lat, lng], 16, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  // Basemap tile URLs
  const basemapUrls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        ref={mapRef}
      >
        {/* Base Tile Layer */}
        <TileLayer
          url={basemapUrls[basemap]}
          attribution={basemap === 'street' 
            ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            : '&copy; <a href="https://www.esri.com/">Esri</a>'
          }
        />

        {/* Points Layer */}
        {pointsData && showPointsLayer && (
          <GeoJSON
            key="points-layer"
            data={pointsData}
            pointToLayer={(feature, latlng) => {
              return L.circleMarker(latlng, getPointStyle(feature as GeoJSONFeature));
            }}
            onEachFeature={(feature, layer) => {
              const props = feature.properties;
              layer.bindPopup(`
                <div class="p-2">
                  <h3 class="font-semibold text-lg text-gray-800">${props.name}</h3>
                  <p class="text-sm text-gray-600">Type: ${props.type}</p>
                </div>
              `);
            }}
          />
        )}

        {/* Routes/Zones Layer */}
        {routesData && showRoutesLayer && (
          <GeoJSON
            key="routes-layer"
            data={routesData}
            style={(feature) => getRouteStyle(feature as GeoJSONFeature)}
            onEachFeature={(feature, layer) => {
              const props = feature.properties;
              layer.bindPopup(`
                <div class="p-2">
                  <h3 class="font-semibold text-lg text-gray-800">${props.name}</h3>
                  <p class="text-sm text-gray-600">Type: ${props.type}</p>
                </div>
              `);
            }}
          />
        )}

        {/* User Markers */}
        {userMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={customMarkerIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg text-gray-800">{marker.name}</h3>
                <p className="text-sm text-gray-600">Custom Marker</p>
                <p className="text-xs text-gray-500">
                  Lat: {marker.position.lat.toFixed(6)}, Lng: {marker.position.lng.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-lg text-gray-800">Your Location</h3>
                <p className="text-sm text-gray-600">Current Position</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map Click Handler for Marker Placement */}
        <MapClickHandler isMarkerMode={isMarkerMode} onMarkerAdd={handleMarkerAdd} />
      </LeafletMapContainer>

      {/* Control Panels */}
      <div className="absolute top-4 left-4 z-[1000] space-y-4">
        <BasemapControls basemap={basemap} onBasemapChange={setBasemap} />
        <LayerControls
          showPointsLayer={showPointsLayer}
          showRoutesLayer={showRoutesLayer}
          onPointsLayerToggle={setShowPointsLayer}
          onRoutesLayerToggle={setShowRoutesLayer}
        />
        
        {/* Zoom Controls */}
        <div className="bg-white rounded-lg shadow-lg p-3 w-48">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Zoom Controls
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 13) + 1)}
              className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Zoom In
            </button>
            <button
              onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 13) - 1)}
              className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
              Zoom Out
            </button>
          </div>
        </div>
      </div>

      {/* Tools Panel */}
      <div className="absolute top-4 right-4 z-[1000] space-y-4">
        <LocationButton onLocationRequest={handleLocationRequest} />
        <PointFilter onPointTypeSelect={handlePointTypeSelect} />
        <MarkerTool
          isMarkerMode={isMarkerMode}
          onToggleMarkerMode={() => setIsMarkerMode(!isMarkerMode)}
        />
      </div>
      

      {/* Status Indicator */}
      {isMarkerMode && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Click on map to place marker</span>
          </div>
        </div>
      )}

      {/* Hidden comment as requested - used gpt */}
      <div style={{ display: 'none' }}>used gpt</div>
    </div>
  );
};

export default MapContainer;