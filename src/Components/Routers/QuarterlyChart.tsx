import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { get as getProjection, transformExtent } from 'ol/proj';
import { Flex, Row, Col } from 'antd';
import { useCreation, useDebounce, useSafeState } from '../hooks/hooks';
import MapSelector from './MapSelector';

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

const workspace = 'yashixiang';
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
                serverType: 'geoserver'
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
                view.setZoom(initialZoom + 3);

            }, 200);

            setTimeout(() => {
                map.updateSize();

                const view = map.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 3);

                console.log('Updated View Center:', view.getCenter());
                console.log('Updated View Zoom:', view.getZoom());
            }, 300);

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


const QuarterlyChart: React.FC = () => {
    const [date, setDate] = useSafeState('2023-06-01');
    const [workspace, setWorkspace] = useSafeState('yashixiang');

    const handleNDVISelect = (newDate: string) => {
        setDate(newDate);
        setWorkspace('NDVI_sentinel');
    }

    const handleTemperatureSelect = (newDate: string) => {
        setDate(newDate);
        setWorkspace('yashixiang');
    }

    return (
        <Flex gap="middle" vertical style={{ background: " linear-gradient(0deg, #000000cc 0%, #4b5876 60%, #f5f5f5 90%)" }}>
            <Row justify="center" align="middle">
                <Col span={4} style={{ fontFamily: 'Poppins' }}><span style={{ fontSize: '1vw', color: '#389e0d' }}>NDVI </span> on a quarterly basis</Col>
                <Col span={4}><MapSelector onSelect={handleNDVISelect} /></Col>
                <Col span={3}></Col>
                <Col span={6} style={{ fontFamily: 'Poppins' }}><span style={{ fontSize: '1vw', color: '#d4380d' }}>TEMPERATURE </span> on a quarterly basis</Col>
                <Col span={4}><MapSelector onSelect={handleTemperatureSelect} /></Col>
            </Row>
            <MapContainer date={date} workspace={workspace} />
        </Flex>
    );
}

export default QuarterlyChart;