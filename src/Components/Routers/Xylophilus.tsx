import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { useSafeState } from '../hooks/hooks';
import { FloatButton, Flex, Row, Col } from 'antd';
import { EditFilled, SyncOutlined, ExpandOutlined, } from '@ant-design/icons';
import 'ol/ol.css';
// import  '../../style/mapButton.css';
import '../../style/map.css'

const BASE_URL_1 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/e8826544-2b17-478c-b7bc-9523a8489777';
const BASE_URL_2 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/02067963-3cde-46b5-ab9d-b64247a5fbbf';
const BASE_URL_3 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/66ba550a-a9f6-473e-af66-d22d8d1d1a9b';
const BASE_URL_4 = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/a91ffe76-5903-4911-9cc9-18b3fb4651a6';
const PATH_TEMPLATE = '/{z}/{x}/{y}/tile.png';
const QUERY_PARAMS = '?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2';

const TILE_LAYER_PROJECTION = 'EPSG:4326';
const TILE_LAYER_ATTRIBUTIONS = '松材线虫影像';
const TILE_LAYER_CROSS_ORIGIN = 'anonymous'

const initialZoom = 12;

const URLCenter = [112.653558, 24.464315];  // Error
// const URLCenter = [112.661442, 24.477552];  // Error
// const URLCenter = [112.618188, 24.433336];  // Error
// const URL2Center = [112.611022, 24.49175];  // Error

const URLExtent = [112.645360413305, 24.455265024031199, 112.65991680094101, 24.471444934452599];   // Error
// const URLExtent = [112.655110294347, 24.471407586841199, 112.66768036814, 24.4847441695463];        // Error
// const URLExtent = [112.610644151188, 24.4268354163789, 112.629228165545, 24.442485058849101];       // Error
// const URL2Extent = [112.60870226208201, 24.489847507396998, 112.614833302809, 24.493698583885301];  // Error

interface MyFloatButtonProps {
    toggleFullScreen: () => void;
}

const RemoteSensingImagery: React.FC = () => {
    const [BASE_URL, setBASE_URL] = useSafeState<string>(BASE_URL_1);
    const mapRef = useRef<HTMLDivElement>(null);

    const handleRadioChange = (newURL: string) => {
        setBASE_URL(newURL);
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
        // const TILE_LAYER_URL = `${BASE_URL}${PATH_TEMPLATE}${QUERY_PARAMS}`;
        const TILE_LAYER_URL = `${BASE_URL}${PATH_TEMPLATE}${QUERY_PARAMS}`;

        // const wmsLayer = new TileLayer({
        //     source: new TileWMS({
        //         url: 'https://electric-duly-peacock.ngrok-free.app/geoserver/vector/wms',
        //         params: {
        //             'LAYERS': 'vector:traffic',
        //             'TILED': true,
        //             'FORMAT': 'image/png',
        //         },
        //         projection: TILE_LAYER_PROJECTION,
        //         serverType: 'geoserver',
        //         crossOrigin: TILE_LAYER_CROSS_ORIGIN,
        //     })
        // });

        const map = new Map({
            controls: [],
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    extent: URLExtent,
                    source: new XYZ({
                        url: TILE_LAYER_URL,
                        projection: TILE_LAYER_PROJECTION,
                        attributions: TILE_LAYER_ATTRIBUTIONS,
                        crossOrigin: TILE_LAYER_CROSS_ORIGIN,
                    }),
                }),
                // wmsLayer,
            ],
            view: new View({
                center: URLCenter,
                zoom: initialZoom,
                extent: URLExtent,
            })
        });
        return () => map.setTarget(undefined);
    }, [BASE_URL]);

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
                            <input name="radio-group" id="radio2" className="radio-button__input" type="radio" onChange={() => handleRadioChange(BASE_URL_1)} />
                            <label htmlFor="radio2" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                First
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio1" className="radio-button__input" type="radio" onChange={() => handleRadioChange(BASE_URL_2)} />
                            <label htmlFor="radio1" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Second
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio3" className="radio-button__input" type="radio" onChange={() => handleRadioChange(BASE_URL_3)} />
                            <label htmlFor="radio3" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Third
                            </label>
                        </div>
                        <div className="radio-button">
                            <input name="radio-group" id="radio4" className="radio-button__input" type="radio" onChange={() => handleRadioChange(BASE_URL_4)} />
                            <label htmlFor="radio4" className="radio-button__label">
                                <span className="radio-button__custom"></span>
                                Forth
                            </label>
                        </div>
                    </div>
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