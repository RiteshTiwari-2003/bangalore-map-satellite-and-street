# Interactive Map Application

A modern, responsive web application built with React and Leaflet for displaying interactive maps with multiple GeoJSON layers, custom markers, and location-based features.

## Features

### Core Features
- **Interactive Map**: Built with React-Leaflet for smooth map interactions
- **Dual GeoJSON Layers**: 
  - Points of Interest layer (restaurants, hospitals, parks, schools, shops)
  - Routes & Zones layer (line strings and polygons)
- **Basemap Switching**: Toggle between street and satellite view
- **Layer Controls**: Show/hide individual layers with styled toggle switches
- **Feature Popups**: Click any feature to view detailed information
- **Custom Marker Tool**: Add personalized markers anywhere on the map
- **User Location**: Detect and navigate to user's current location

### Design & UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Clean UI**: Modern interface with floating control panels
- **Smooth Animations**: Hover states and transitions throughout
- **Professional Styling**: Consistent color scheme and typography
- **Intuitive Controls**: Easy-to-use toggles and buttons

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Mapping**: React-Leaflet and Leaflet.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interactive-map-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── MapContainer.tsx      # Main map component
│   ├── BasemapControls.tsx   # Street/satellite toggle
│   ├── LayerControls.tsx     # Layer visibility controls
│   ├── MarkerTool.tsx        # Custom marker placement
│   └── LocationButton.tsx    # User location detection
├── types/
│   └── geojson.ts           # TypeScript interfaces
├── App.tsx                  # Root component
└── main.tsx                 # Application entry point
```

## Key Components

### MapContainer
The main component that orchestrates all map functionality including:
- Leaflet map initialization
- GeoJSON data loading and rendering
- User interaction handling
- State management for layers and markers

### Layer Controls
Provides toggle switches for:
- Points of Interest layer (restaurants, hospitals, parks, etc.)
- Routes & Zones layer (transportation routes and area boundaries)

### Basemap Controls
Allows switching between:
- **Street View**: OpenStreetMap tiles
- **Satellite View**: Esri World Imagery tiles

### Marker Tool
Enables users to:
- Enter marker placement mode
- Click anywhere on the map to add custom markers
- View marker details in popups

## Data Sources

The application uses sample GeoJSON data containing:

1. **Points Layer**: 100+ points of interest around Bangalore including:
   - Restaurants (orange markers)
   - Hospitals (red markers)
   - Parks (green markers)
   - Schools (blue markers)
   - Shops (purple markers)

2. **Routes & Zones Layer**: Transportation routes and administrative zones:
   - Route lines (red lines)
   - Area polygons (blue with transparent fill)

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Efficient GeoJSON rendering with styled layers
- Optimized marker clustering for large datasets
- Responsive design with mobile-first approach
- Lazy loading of map tiles for faster initial load

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue in the repository.