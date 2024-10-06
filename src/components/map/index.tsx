'use client'
import mapboxgl, { GeoJSONFeature } from "mapbox-gl"
import { useEffect, useRef, useState } from 'react';

interface InternalFeatureSpec {
    name: string;
    icon: string;
    latitude: number;
    longitude: number;
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

    mapboxgl.accessToken = "pk.eyJ1Ijoic2FtYWxleGFuZGVybWFzdGVycyIsImEiOiJjbGcwanlrM2swdGhhM3BwOW94NWloOGF5In0.Wp0AP1IVbNwI6zkZ26U2Ag";

    useEffect(() => {

        if (coordinates && !mb) {
            const { lat, lng } = coordinates
            const mapbox = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/' + (props?.dark ? 'dark' : 'light') + '-v10',
                center: [lng, lat], // center map on Chad
                zoom: 12,
                pitch: 80,
                ...config
            })

            mapbox.on("load", () => {
                const markers = props.features.map((feature: InternalFeatureSpec) => {
                    new mapboxgl.Marker({ color: "var(--color-brand)" })
                        .setLngLat([feature.longitude, feature.latitude])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML('<h3>' + feature.name + '</h3><p>' + feature + '</p>'))
                        .addTo(mapbox);
                })
                // const marker = new mapboxgl.Marker({ color: "var(--color-brand)" })
                //     .setLngLat([lng, lat])
                //     .addTo(mapbox);
                setMb(true)
            })
        }

    }, [mb, coordinates, config, props?.dark])


    if (!coordinates) return "Can't load map"

    return <div className="map-container" id='map-container' ref={mapContainer} >
        <div className="map" style={{ height: "640px", ...props?.style }} id='map' ref={map}></div>
    </div>
}

export default Map;