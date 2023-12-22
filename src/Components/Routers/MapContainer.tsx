import React, { useEffect, useRef, Suspense, lazy } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { get as getProjection, transformExtent } from 'ol/proj';
import { useCreation, useDebounce, useSafeState } from '../hooks/hooks';

import 'ol/ol.css';
import '../../style/map.css';

interface WMSMapProps {
    geoServerUrl: string;
    layers: string;
}

interface MapContainerProps {
    date: string;
    workspace: string;
}

// const workspace = 'yashixiang';
const protocol = 'wms';
const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

const WMSMap: React.FC<WMSMapProps> = ({ geoServerUrl, layers }) => {
    const mapRef = useRef<Map | null>(null);            // 持有 ol/Map 实例
    const mapContainerRef = useRef<HTMLDivElement | null>(null);   // 持有地图容器DOM元素的ref
    const initialCenter = [112.6, 24.4];
    const initialZoom = 7;

    const debounceResize = useDebounce(() => {
        mapRef.current?.updateSize();
        const view = mapRef.current?.getView();

        if (view) {
            view.fit(view.getProjection().getExtent(), {
                size: mapRef.current?.getSize(),
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
                serverType: 'geoserver',
            }),
        });

        const map = new Map({
            target: mapContainerRef.current!,
            layers: [wmsLayer],
            view: new View({
                projection: 'EPSG:4326',
                center: initialCenter,
                zoom: initialZoom,
                minZoom: initialZoom + 2,
                maxZoom: initialZoom + 9,
                // extent: transformExtent(
                //     [110, 23, 114, 26], 'EPSG:4326', 'EPSG:3857'
                // )
            })
        });

        mapRef.current = map;  // 持有ol/Map实例

        setTimeout(() => {
            map.updateSize();

            const view = map.getView();
            view.setCenter(initialCenter);
            view.setZoom(initialZoom + 3);

            console.log('Updated View Center1:', view.getCenter());
            console.log('Updated View Zoom1:', view.getZoom());
        }, 100);

        if (mapContainerRef.current) {
            map.setTarget(mapContainerRef.current);

            // 延迟更新地图大小
            setTimeout(() => {
                map.updateSize();

                const view = map.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 3);

                console.log('Updated View Center2:', view.getCenter());
                console.log('Updated View Zoom2:', view.getZoom());
            }, 100);

            map.on('change', () => {
                console.log('Map view changed:', map.getView().getCenter(), map.getView().getZoom());
            });

            window.addEventListener('resize', debounceResize);
        }

        return () => {
            window.removeEventListener('resize', debounceResize);
            mapRef.current?.setTarget();
            mapRef.current = null;
        }
    }, [geoServerUrl, layers, debounceResize]);

    return <div ref={mapContainerRef} className='map-container-page2'></div>
}


const MapContainer: React.FC<MapContainerProps> = ({ date, workspace }) => {
    const layers = `${workspace}:${date}`;
    const geoServerUrl = `${domain}${workspace}/${protocol}`;

    return (
        <WMSMap geoServerUrl={geoServerUrl} layers={layers} />
    );
};


export default MapContainer;