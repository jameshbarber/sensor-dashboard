'use client'
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapInputProps {
  value: Coordinates;
  onChange: (coords: Coordinates) => void;
  style?: React.CSSProperties;
  icon?: string;
}

const MapInput = ({ value, onChange, style, icon }: MapInputProps) => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) throw new Error("Mapbox token not provided");
  mapboxgl.accessToken = token

  useEffect(() => {
    if (map.current) return; // Map already initialized
    if (!value) return;

    const mapbox = new mapboxgl.Map({
      
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/standard-satellite",
      center: [value.longitude, value.latitude],
      zoom: 12
    });

    map.current = mapbox;

    mapbox.on('click', (e) => {
      const newCoords = { latitude: e.lngLat.lat, longitude: e.lngLat.lng };

      // Move marker if it already exists, otherwise create a new one
      if (marker.current) {
        marker.current.setLngLat([newCoords.longitude, newCoords.latitude]);
      } else {
        marker.current = new mapboxgl.Marker().setLngLat([newCoords.longitude, newCoords.latitude]).addTo(mapbox);
      }

      // Update the coordinates via onChange
      onChange(newCoords);
    });

    // Initialize marker at the initial coordinates
    marker.current = new mapboxgl.Marker().setLngLat([value.longitude, value.latitude]).addTo(mapbox);
  }, [value, onChange]);

  return (
    <div className="map-container" style={{ height: "200px", ...style }} ref={mapContainer}></div>
  );
};

export default MapInput;