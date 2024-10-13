'use client'
import mapboxgl from "mapbox-gl"
import { useEffect, useRef, useState } from 'react';

interface InternalFeatureSpec {
    name: string;
    icon: string;
    latitude: number;
    longitude: number;
    shade: boolean;
}

interface MapProps {
    config: any;
    style: React.CSSProperties;
    features: InternalFeatureSpec[]
    coordinates: {
        lat: number;
        lng: number;
    }
    dark?: boolean;
}

const Map = ({ ...props }: MapProps) => {

    const { config, coordinates } = props
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mb, setMb] = useState(false);

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) throw new Error("Mapbox token not provided");
    mapboxgl.accessToken = token


    useEffect(() => {

        if (coordinates && !mb) {
            const { lat, lng } = coordinates
            const mapbox = new mapboxgl.Map({
                container: 'map',
                style: "mapbox://styles/mapbox/standard-satellite",
                center: [lng, lat],
                zoom: 12,
                pitch: 80,
                ...config
            })

            mapbox.on("load", () => {
                props.features.forEach((feature: InternalFeatureSpec) => {
                    const el = document.createElement('div');
                    el.className = 'custom-marker';

                    // Set the custom icon for the marker
                    el.style.backgroundImage = `url(${"/" + feature.icon}.png)`;
                    el.style.width = '32px';
                    el.style.height = '32px';
                    el.style.backgroundSize = 'cover';

                    // Add the marker with the custom icon
                    new mapboxgl.Marker(el)
                        .setLngLat([feature.longitude, feature.latitude])
                        .setPopup(new mapboxgl.Popup({ offset: 25 })
                            .setHTML('<h3>' + feature.name + '</h3>'))
                        .addTo(mapbox);
                });
                setMb(true);
            });
        }

    }, [mb, coordinates, config, props?.dark])


    if (!coordinates) return "Can't load map"

    return <div className="map-container bg-gray-100" id='map-container' ref={mapContainer} >
        <div className="map" style={{ height: "640px", ...props?.style }} id='map' ref={map}></div>
    </div>
}

export default Map;