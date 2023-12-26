import React, { useEffect, useRef, useCallback } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ, OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import '../../../assets/styles/map.css';
import 'ol/ol.css';
import Floatbutton from '../../../components/floatbutton';

const url = '../../assets/data/yangshan_geo.geojson';
const center = [112.678303857182, 24.341823323344173];
const transformedCenter = fromLonLat(center);

const Boundary: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = useCallback(() => {
        const mapElement = mapRef.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const vectorSource = new VectorSource({
            url: url,
            format: new GeoJSON(),
        });

        const map = new Map({
            controls: [],
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
                center: transformedCenter,
                zoom: 10,
            }),
        });

        vectorSource.on('featuresloadend', () => {
            alert('GeoJSON features have been loaded and rendered');
        })

        return () => map.setTarget(undefined);
    }, []);

    return (
        <>
            <div ref={mapRef} className='map-container'></div>
            <Floatbutton toggleFullScreen={toggleFullScreen} />
        </>
    )
}

export default Boundary;