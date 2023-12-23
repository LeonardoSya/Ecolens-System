import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { XYZ, TileWMS } from 'ol/source';
import { useSafeState } from '../../hooks/hooks';
import { FloatButton, Flex, Row, Col } from 'antd';
import { EditFilled, SyncOutlined, ExpandOutlined, } from '@ant-design/icons';
import './services.css';
import '../../assets/styles/map.css'
import 'ol/ol.css';

const mapInfo = [
    { id: '2ce48a09-3160-46ef-9349-76b5bde1caae', center: [12543291.408831256, 2795116.434460827], zoom: 12.5 },
    { id: '61f9b270-a42c-4d9e-a9dc-ac3af586b313', center: [12543291.408831256, 2795116.434460827], zoom: 12.5 },
];
const extent = [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587];

const RSImagery: React.FC = () => {
    const [item, setItem] = useSafeState(mapInfo[0]);
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleItem = () => {
        setItem(item === mapInfo[0] ? mapInfo[1] : mapInfo[0]);
    };

    const toggleFullScreen = () => {
        const mapElement = mapRef.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    useEffect(() => {
        const url = `http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/${item.id}/{z}/{x}/{y}/tile.png?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2`;

        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: 'https://electric-duly-peacock.ngrok-free.app/geoserver/vector/wms',
                params: {
                    'LAYERS': 'vector:traffic',
                    'TILED': true,
                    'FORMAT': 'image/png',
                },
                projection: 'EPSG:4326',
                serverType: 'geoserver',
                crossOrigin: 'anonymous',
            })
        });

        const map = new Map({
            controls: [],
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    extent: extent,
                    source: new XYZ({
                        url: url,
                        projection: 'EPSG:4326',
                        attributions: '阳山县遥感影像',
                        crossOrigin: 'anonymous',
                    }),
                }),
                wmsLayer,
            ],
            view: new View({
                center: item.center,
                zoom: item.zoom,
                extent: [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587],
            })
        });

        return () => map.setTarget(undefined);
    }, [item]);

    return (
        <Flex gap="small" vertical>
            <Row justify="center" align="top">
                <Col span={7}>
                    <span style={{ fontFamily: 'Silkscreen', fontSize: '1.3vw' }}>
                        🚀change RS Imagery!
                    </span>
                </Col>
                <Col span={4}>
                    <label className="switch" onClick={toggleItem}>
                        <input type="checkbox" className="input" />
                        <span className="slider"></span>
                    </label>
                </Col>
                <Col span={4}></Col>
            </Row>
            <div ref={mapRef} className='map-container' style={{ background: "#000000cc" }} ></div>
            <MyFloatButton toggleFullScreen={toggleFullScreen} />
        </Flex>
    );
};

interface MyFloatButtonProps {
    toggleFullScreen: () => void;
}
const MyFloatButton: React.FC<MyFloatButtonProps> = ({ toggleFullScreen }) => {
    return (
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
    );
};

export default RSImagery;