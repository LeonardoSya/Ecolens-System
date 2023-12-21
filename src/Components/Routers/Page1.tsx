import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import '../../style/map.css'

const Page1 = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = new Map({
                target: mapRef.current,
                layers: [
                    // 无人机图像图层
                    new TileLayer({
                        source: new XYZ({
                            url: '/api/61f9b270-a42c-4d9e-a9dc-ac3af586b313/{z}/{x}/{y}/tile.png?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2',
                            attributions: '无人机图像',
                            crossOrigin: 'anonymous'
                        })
                    })
                ],
                view: new View({
                    center: fromLonLat([112.6, 24.4]),
                    zoom: 2,
                    projection: 'EPSG:4326'
                })
            });

            return () => map.setTarget(undefined);
        }
    }, []);

    return <div ref={mapRef} className='map-container-page1' />;
}


export default Page1;