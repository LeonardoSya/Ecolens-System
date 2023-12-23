import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import TileWMS from 'ol/source/TileWMS';
import XYZ from 'ol/source/XYZ';
import { Attribution, FullScreen, MousePosition, Rotate, ScaleLine, ZoomToExtent } from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import { useSafeState } from '../hooks/hooks';
import { FloatButton, Flex, Row, Col } from 'antd';
import { EditFilled, SyncOutlined, ExpandOutlined, } from '@ant-design/icons';
import { coordinateRelationship } from 'ol/extent';
// import '../../../style/mapButton.css';
import '../../style/map.css'
import 'ol/ol.css';


const BASE_URL_1 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/2ce48a09-3160-46ef-9349-76b5bde1caae';
const BASE_URL_2 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/61f9b270-a42c-4d9e-a9dc-ac3af586b313';
const PATH_TEMPLATE = '/{z}/{x}/{y}/tile.png';
const QUERY_PARAMS = '?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2';

const TILE_LAYER_PROJECTION = 'EPSG:4326';
const TILE_LAYER_ATTRIBUTIONS = '松材线虫无人机影像';
const TILE_LAYER_CROSS_ORIGIN = 'anonymous'

const initialZoom = 12.5;
const initialCenter = [12543291.408831256, 2795116.434460827];
interface MyFloatButtonProps {
    toggleFullScreen: () => void;
}

const RemoteSensingImagery: React.FC = () => {
    const [BASE_URL, setBASE_URL] = useSafeState<string>(BASE_URL_1);
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleBASE_URL = () => {
        setBASE_URL(BASE_URL === BASE_URL_1 ? BASE_URL_2 : BASE_URL_1);
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
        const TILE_LAYER_URL = `${BASE_URL}${PATH_TEMPLATE}${QUERY_PARAMS}`;

        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: 'https://electric-duly-peacock.ngrok-free.app/geoserver/vector/wms',
                params: {
                    'LAYERS': 'vector:traffic',
                    'TILED': true,
                    'FORMAT': 'image/png',
                },
                projection:TILE_LAYER_PROJECTION,
                serverType:'geoserver',
                crossOrigin: TILE_LAYER_CROSS_ORIGIN,
            })
        });

        const map = new Map({
            controls: [],
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    extent: [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587],
                    source: new XYZ({
                        url: TILE_LAYER_URL,
                        projection: TILE_LAYER_PROJECTION,
                        attributions: TILE_LAYER_ATTRIBUTIONS,
                        crossOrigin: TILE_LAYER_CROSS_ORIGIN,
                    }),
                }),
                wmsLayer,
            ],
            view: new View({
                center: initialCenter,
                zoom: initialZoom,
                extent: [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587],
            })
        });
        return () => map.setTarget(undefined);
    }, [BASE_URL]);

    return (
        <Flex gap="small" vertical>
            <Row justify="center" align="top">
                <Col span={7}>
                    <span style={{ fontFamily: 'Silkscreen', fontSize: '1.3vw' }}>
                        🚀change RS Imagery!
                    </span>
                </Col>
                <Col span={4}>
                    <label className="switch" onClick={toggleBASE_URL}>
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

export default RemoteSensingImagery;