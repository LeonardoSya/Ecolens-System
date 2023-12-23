import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ, OSM, Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import '../../style/map.css';
import 'ol/ol.css';

const url = '../../assets/data/yangshan_geo.geojson'
const initialCenter: [number, number] = [112.65, 24.4];
const initialZoom = 8;

const Page4: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        const vectorSource = new VectorSource({
            url: url,
            format: new GeoJSON(),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                // 添加OSM源的 base map 底图
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: vectorSource,
                }),
            ],
            view: new View({
                center: initialCenter,
                zoom: initialZoom,
            }),
        });

        vectorSource.on('featuresloadend', () => {
            alert('GeoJSON features have been loaded and rendered');
        })

        return () => map.setTarget(undefined);
    }, []);

    return (
        <div ref={mapRef} className='map-container'></div>
    )
}

export default Page4;