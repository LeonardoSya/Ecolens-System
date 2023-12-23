import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { Projection, fromLonLat, toLonLat } from 'ol/proj';
import { FloatButton, Flex, Row, Col } from 'antd';
import { EditFilled, SyncOutlined, ExpandOutlined, } from '@ant-design/icons';
import 'ol/ol.css';
// import  '../../style/mapButton.css';
import '../../style/map.css'
import { Coordinate } from '@antv/g2';
import { ProjectionLike } from 'ol/proj';

const mapInfo = [
    { id: 'e8826544-2b17-478c-b7bc-9523a8489777', center: [], zoom: 1 },
    { id: '02067963-3cde-46b5-ab9d-b64247a5fbbf', center: [112.61178989861932, 24.49146364092972], zoom: 18.5 },
    { id: '66ba550a-a9f6-473e-af66-d22d8d1d1a9b', center: [], zoom: 1 },
    { id: 'a91ffe76-5903-4911-9cc9-18b3fb4651a6', center: [], zoom: 1 },
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

const MapContainer: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    // 全屏切换
    const toggleFullScreen = () => {
        const mapElement = mapRef?.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    useEffect(() => {
        if (!mapRef.current) return;

        const item = mapInfo[1];

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
    }, [mapRef]);

    return (
        <>
            <MyFloatButton toggleFullScreen={toggleFullScreen} />
            <div ref={mapRef} className='map-container' style={{ background: '#000000cc' }} ></div>
        </>
    )
};

interface MyFloatButtonProps {
    toggleFullScreen: () => void;
}

const MyFloatButton: React.FC<MyFloatButtonProps> = React.memo(({ toggleFullScreen }) => (
    <FloatButton.Group
        shape='circle'
        style={{ right: 24 }}
    >
        <FloatButton icon={<ExpandOutlined />} onClick={toggleFullScreen} />
        <FloatButton icon={<EditFilled />} />
        <FloatButton />
        <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} />
        <FloatButton.BackTop visibilityHeight={70} />
    </FloatButton.Group>
));

const Xylophilus = () => {
    return (
        <Flex gap="small" vertical>
            <Row justify="center" align="top">
                <Col span={10}>
                    <span style={{ fontFamily: 'Silkscreen', fontSize: '1.3vw' }}>
                        🔍change xylophilus Imagery!
                    </span>
                </Col>
                <Col span={6}>
                    <div className="radio-buttons-container" >
                        <div className="radio-button">
                            <input name="radio-group" id="radio2" className="radio-button__input" type="radio" />
                            <label htmlFor="radio2" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                First
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio1" className="radio-button__input" type="radio" />
                            <label htmlFor="radio1" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Second
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio3" className="radio-button__input" type="radio" />
                            <label htmlFor="radio3" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Third
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio4" className="radio-button__input" type="radio" />
                            <label htmlFor="radio4" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Forth
                            </label>
                        </div>
                    </div>
                </Col>
                <Col span={4}></Col>
            </Row>
            <MapContainer />
        </Flex>
    );
};

export default Xylophilus;