export interface PointProperties {
  name: string;
  type: string;
}

export interface RouteProperties {
  name: string;
  type: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: PointProperties | RouteProperties;
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[] | number[][] | number[][][];
  };
}

export interface GeoJSONData {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}