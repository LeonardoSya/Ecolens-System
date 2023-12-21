import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { get as getProjection, transformExtent } from 'ol/proj';
import { useCreation, useDebounce, useSafeState } from '../hooks/hooks';
import MapSelector from './MapSelector';

import 'ol/ol.css';
import '../../style/map.css';

const workSpace = 'yashixiang';
const date = '2013-03-01';
const protocol = 'wms';
const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

const WMSMap = ({ geoServerUrl, layers }) => {
    const mapRef = useRef(null);            //* 持有 ol/Map 实例
    const mapContainerRef = useRef(null);   //* 持有地图容器DOM元素的ref
    const initialCenter = [112.6, 24.4];
    const initialZoom = 3;
    const debounceResize = useDebounce(() => {
        if (mapRef.current) {
            mapRef.current.updateSize();
            const view = mapRef.current.getView();
            view.fit(view.getProjection().getExtent(), {
                size: mapRef.current.getSize(),
                padding: [1, 1, 1, 1]
            });
        }
    }, 250);

    useEffect(() => {
        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: geoServerUrl,
                params: {
                    'LAYERS': layers,   // LAYERS: '工作空间名称:图层名称'  
                    'TILED': true,   // TILED: 是否使用瓦片(tiled)模式获取地图
                    'VERSION': '1.1.1',
                    'FORMAT': 'image/jpeg'
                },
                serverType: 'geoserver'
            }),
        });

        const map = new Map({
            target: mapContainerRef.current,
            layers: [wmsLayer],
            view: new View({
                projection: 'EPSG:4326',
                center: initialCenter,
                zoom: initialZoom,
            })
        });

        mapRef.current = map;  // 持有ol/Map实例

        if (mapContainerRef.current) {
            map.setTarget(mapContainerRef.current);

            // 延迟更新地图大小
            setTimeout(() => {
                map.updateSize();

                const view = map.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 7);

            }, 100);

            setTimeout(() => {
                map.updateSize();

                const view = map.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 7);

                console.log('Updated View Center:', view.getCenter());
                console.log('Updated View Zoom:', view.getZoom());
            }, 200);

            map.on('change', () => {
                console.log('Map view changed:', map.getView().getCenter(), map.getView().getZoom());
            });

            window.addEventListener('resize', debounceResize);
        }

        return () => {
            window.removeEventListener('resize', debounceResize);
            if (mapRef.current) {
                mapRef.current.setTarget(null);
                mapRef.current = null;
            }
        }
    }, [geoServerUrl, layers, debounceResize]);

    return <div ref={mapContainerRef} className='map-container-page2'></div>
}



const MapContainer = ({ date }) => {
    const layers = `${workSpace}:${date}`;
    const geoServerUrl = `${domain}${workSpace}/${protocol}`;

    return (
        <WMSMap geoServerUrl={geoServerUrl} layers={layers} />
    );
};


const AnnualNDVI = () => {
    const [date, setDate] = useSafeState('2013-03-01');

    return (
        <>
            <MapSelector onSelect={setDate} />
            <MapContainer date={date} />
        </>
    );
}

export default AnnualNDVI;