import React from 'react';
import MapContainer from './components/MapContainer';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="w-full h-screen">
      <MapContainer />
    </div>
  );
}

export default App;