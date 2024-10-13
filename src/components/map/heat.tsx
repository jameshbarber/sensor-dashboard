'use client'
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from 'react';

import React from 'react';

interface HeatmapLegendProps {
    minTemp: number;
    maxTemp: number;
}

// Define the color stops (same as in the heatmap layer)
const colorStops = [
    { color: 'rgba(33,102,172,0)', density: 0 },
    { color: 'rgb(103,169,207)', density: 0.2 },
    { color: 'rgb(209,229,240)', density: 0.4 },
    { color: 'rgb(253,219,199)', density: 0.6 },
    { color: 'rgb(239,138,98)', density: 0.8 },
    { color: 'rgb(178,24,43)', density: 1 },
];

const HeatmapLegend: React.FC<HeatmapLegendProps> = ({ minTemp, maxTemp }) => {
    // Function to interpolate the temperature based on the density
    const interpolateTemperature = (density: number) => {
        return (minTemp + (maxTemp - minTemp) * density).toFixed(1);  // Limit to one decimal place
    };

    return (
        <div style={styles.legendContainer}>
            <div style={styles.gradient}>
                {/* Create a div for each color stop */}
                {colorStops.map((stop, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.legendItem,
                            backgroundColor: stop.color,
                        }}
                    />
                ))}
            </div>
            <div style={styles.labels}>
                {/* Render interpolated temperature labels */}
                {colorStops.map((stop, index) => (
                    <div key={index} style={styles.label}>
                        {interpolateTemperature(stop.density)}°C
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles for the legend container, gradient, and labels
const styles = {
    legendContainer: {
        display: 'flex',
        flexDirection: 'column' as "column",
        alignItems: 'center',
        marginTop: '10px',
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    gradient: {
        display: 'flex',
        width: '200px',
        height: '20px',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    legendItem: {
        flex: 1,
    },
    labels: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        marginTop: '5px',
    },
    label: {
        fontSize: '12px',
        color: '#333',
    },
};

export { HeatmapLegend };

interface InternalFeatureSpec {
    name: string;
    icon: string;
    temperature: number;
    shade: boolean;
    latitude: number;
    longitude: number;
}

interface MapProps {
    config: any;
    style: React.CSSProperties;
    features: InternalFeatureSpec[];
    coordinates: {
        lat: number;
        lng: number;
    };
    dark?: boolean;
    bounds: {
        max: number;
        min: number;
    }
}

const HeatMap = ({ bounds, ...props }: MapProps) => {

    const { config, coordinates } = props;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mb, setMb] = useState(false);

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) throw new Error("Mapbox token not provided");
    mapboxgl.accessToken = token

    useEffect(() => {

        if (coordinates && !mb) {
            const { lat, lng } = coordinates;
            const mapbox = new mapboxgl.Map({
                container: 'map',
                style: "mapbox://styles/mapbox/standard-satellite",
                center: [lng, lat],
                zoom: 12,
                pitch: 80,
                ...config
            });

            const sensorData: GeoJSON.FeatureCollection = {
                type: 'FeatureCollection',
                features: props.features.map((feature, index) => {

                    return ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [feature.longitude, feature.latitude],
                        },
                        properties: {
                            temperature: feature.temperature,
                        },
                    })
                }),
            };


            mapbox.on("load", () => {
                // Add the sensor data source
                mapbox.addSource('sensor-data', {
                    type: 'geojson',
                    data: sensorData,
                });

                // Add a heatmap layer
                mapbox.addLayer({
                    id: 'sensor-heatmap',
                    type: 'heatmap',
                    source: 'sensor-data',
                    paint: {
                        // Keep heatmap weight based on temperature
                        'heatmap-weight': [
                            'interpolate',
                            ['linear'],
                            ['get', 'temperature'],
                            0, 1,
                            bounds?.max, bounds?.min // Adjust according to the temperature range
                        ],
                        // Keep the intensity constant across zoom levels
                        'heatmap-intensity': 1,

                        // Fixed opacity across all zoom levels
                        // 'heatmap-opacity': 1,

                        // Color ramp for the heatmap
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0, 'rgba(33,102,172,0)',
                            0.2, 'rgb(103,169,207)',
                            0.4, 'rgb(209,229,240)',
                            0.6, 'rgb(253,219,199)',
                            0.8, 'rgb(239,138,98)',
                            1, 'rgb(178,24,43)'
                        ],
                        // Set a constant radius for the heatmap circles across all zoom levels
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            0, 2,
                            1, 20
                        ],
                    }
                });

                setMb(true);
            });
        }

    }, [mb, coordinates, config, props?.dark]);

    if (!coordinates) return "Can't load map";

    return <div className="map-container" id='map-container' ref={mapContainer}>
        <div className="map" style={{ height: "640px", ...props?.style }} id='map' ref={map}></div>
    </div>;
};

export default HeatMap;
