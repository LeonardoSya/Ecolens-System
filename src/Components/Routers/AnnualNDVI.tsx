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

    const mapCotainerRef = useRef(null);
    const initialCenter = [112.6, 24.4];
    const initialZoom = 3;

    const mapStore = useCreation(() => {
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

        // 在TileLayer的定义中添加事件监听来检查图层是否加载
        wmsLayer.on('error', function (event) {
            console.error('WMS Layer failed to load:', event);
        });

        const extentInEPSG4326 = [111, 23, 114, 26];
        const extent = transformExtent(extentInEPSG4326, 'EPSG:4326', 'EPSG:3857');

        return new Map({
            layers: [wmsLayer],
            view: new View({
                center: initialCenter,
                zoom: initialZoom,
                projection: getProjection('EPSG:4326'),
            }),
        });
    }, [geoServerUrl, layers]);


    const debounceResize = useDebounce(() => {
        if (mapStore) {
            mapStore.updateSize();
            const view = mapStore.getView();
            view.fit(view.getProjection().getExtent(), {
                size: mapStore.getSize(),
                padding: [1, 1, 1, 1]
            });
        }
    }, 250);


    useEffect(() => {
        if (mapCotainerRef.current) {
            mapStore.setTarget(mapCotainerRef.current);

            // 延迟更新地图大小
            setTimeout(() => {
                mapStore.updateSize();

                const view = mapStore.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 7);

            }, 100);

            setTimeout(() => {
                mapStore.updateSize();

                const view = mapStore.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 7);

                console.log('Updated View Center:', view.getCenter());
                console.log('Updated View Zoom:', view.getZoom());
            }, 200);

            // console.log('Map Size:', mapStore.getSize());
            // console.log('View Center:', mapStore.getView().getCenter());
            // console.log('View Zoom:', mapStore.getView().getZoom());

            mapStore.on('change', () => {
                console.log('Map view changed:', mapStore.getView().getCenter(), mapStore.getView().getZoom());
            });

            window.addEventListener('resize', debounceResize);

            return () => {
                window.removeEventListener('resize', debounceResize);
            };
        }
    }, [mapStore]);

    return <div ref={mapCotainerRef} className='map-container-page2'></div>
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