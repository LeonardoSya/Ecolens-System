import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Flex, Row, Col, message } from 'antd';
import Floatbutton from '../../../components/floatbutton';
import useSafeState from '../../../hooks/useSafeState';
import 'ol/ol.css';
import '../services.css';
import './index.css';
import '../../../assets/styles/map.css'

const mapInfo = [
    { id: '02067963-3cde-46b5-ab9d-b64247a5fbbf', center: [112.61178989861932, 24.49146364092972], zoom: 18.5, label: "First" },
    { id: 'e8826544-2b17-478c-b7bc-9523a8489777', center: [112.654095, 24.462341], zoom: 17.5, label: "Second" },
    { id: '66ba550a-a9f6-473e-af66-d22d8d1d1a9b', center: [112.661316, 24.474848], zoom: 17.9, label: "Third" },
    { id: 'a91ffe76-5903-4911-9cc9-18b3fb4651a6', center: [112.619898, 24.432980], zoom: 16.9, label: "Forth" },
];

interface MapKitState {
    map: Map;
    fromLonLat: typeof fromLonLat;
    toLonLat: typeof toLonLat;
}
// 扩展全局window接口
declare global {
    interface Window {
        _mapKitState: MapKitState;
    }
}

const Xylophilus: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [item, setItem] = useSafeState(mapInfo[0]);
    const [messageApi, contextHolder] = message.useMessage();

    const infoMessage = () => {
        messageApi.info('You have switched to xxx page.');
    };

    // 全屏切换
    const toggleFullScreen = () => {
        const mapElement = mapRef?.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const toggleItem = (index: number) => {
        setItem(mapInfo[index]);
    }

    useEffect(() => {
        if (!mapRef.current || !item) return;

        const map = new Map({
            controls: [],
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/${item.id}/{z}/{x}/{y}/tile.png?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2`,
                        projection: 'EPSG:4326',
                        crossOrigin: 'anonymous',
                    }),
                }),
            ],
            view: new View({
                // extent:
                center: fromLonLat(item.center),
                zoom: item.zoom,
                minZoom: item.zoom - 1.5,
                maxZoom: item.zoom + 5,
            })
        });

        window._mapKitState = {
            map,
            fromLonLat,
            toLonLat,
        };

        return () => map.setTarget(undefined);
    }, [mapRef, item]);

    return (
        <>
            {contextHolder}
            <Flex gap="small" vertical>
                <Row justify="center" align="top">
                    <Col span={8}>
                        <span style={{ fontFamily: 'Silkscreen', fontSize: '1.3vw' }}>
                            🔍change xylophilus Imagery!
                        </span>
                    </Col>
                    <Col span={8}>
                        <div className='radio-buttons-container'>
                            {mapInfo.map((info, index) => (
                                <div className="radio-button" key={index}>
                                    <input
                                        name="radio-group"
                                        id={`radio${index}`}
                                        className="radio-button__input"
                                        type="radio"
                                        onChange={() => { toggleItem(index); infoMessage(); }}
                                    />
                                    <label htmlFor={`radio${index}`} className="radio-button__label">
                                        <span className="radio-button__custom"></span>
                                        {info.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Floatbutton toggleFullScreen={toggleFullScreen} />
                <div ref={mapRef} className='map-container' style={{ background: '#000000cc' }} ></div>
            </Flex>

        </>
    )
};
export default Xylophilus;