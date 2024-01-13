import React, { useCallback, useContext, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import { useSafeState, useCreation } from '../../../hooks/hooks';
import { Flex, Row, Col, message } from 'antd';
import Floatbutton from '../../../components/floatbutton';
import Loader from '../../../components/loader';
import RoamingGuide from '../../../components/tour';
import { GuideContext, GuideProvider } from '../../../models/tour-context';
import '../services.css';
import '../../../assets/styles/map.css'
import 'ol/ol.css';

const mapInfo = [
    { id: '61f9b270-a42c-4d9e-a9dc-ac3af586b313', center: [112.678303857182, 24.38823323344173], zoom: 12.5 },
    { id: '2ce48a09-3160-46ef-9349-76b5bde1caae', center: [112.678303857182, 24.341823323344173], zoom: 12.5 },
];
const extent = [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587];

const RSImagery: React.FC = React.memo(() => {
    const [item, setItem] = useSafeState(mapInfo[0]);
    const mapRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useSafeState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { refs } = useContext(GuideContext);
    let timeoutId: number | null | undefined = null;
    const info = () => {
        messageApi.info(`您已切换至${item === mapInfo[0] ? '2022' : '2023'}年的遥感影像`);
    };

    const toggleItem = useCallback(() => {
        setItem(item === mapInfo[0] ? mapInfo[1] : mapInfo[0]);
    }, [item]);

    const toggleFullScreen = useCallback(() => {
        const mapElement = mapRef.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    const transformedCenter = useCreation(() => fromLonLat(item.center), []);

    useEffect(() => {
        const url = `http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/${item.id}/{z}/{x}/{y}/tile.png?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2`;

        const xyzSource = new XYZ({
            url: url,
            projection: 'EPSG:4326',
            attributions: '阳山县遥感影像',
            crossOrigin: 'anonymous',
        });

        xyzSource.on('tileloadstart', () => {
            setIsLoading(true);
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                setIsLoading(false);
                timeoutId = null;
            }, 2000);
        });

        const map = new Map({
            controls: [],
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    extent: extent,
                    source: xyzSource,
                }),
            ],
            view: new View({
                center: transformedCenter,
                zoom: item.zoom,
                extent: extent,
            })
        });

        window._mapKitState = {
            map,
            fromLonLat,
            toLonLat,
        };

        return () => map.setTarget(undefined);
    }, [item]);

    return (
        <GuideProvider>
            {contextHolder}
            <Loader isLoading={isLoading} />
            <Flex gap="small" vertical>
                <RoamingGuide />

                <Row justify="center" align="top">
                    <Col span={7}>
                        <span style={{ fontSize: '1.3vw' }}>
                            🚀 区域变化遥感影像
                        </span>
                    </Col>

                    <Col span={4} ref={refs.ref1}>
                        <label className="switch" onChange={() => { toggleItem(); info(); }}>
                            <input type="checkbox" className="input" />
                            <span className="slider"></span>
                        </label>
                    </Col>

                    <Col span={4}></Col>
                </Row>
                <div ref={mapRef} className='map-container' style={{ background: "#000000cc" }} ></div>
                <Floatbutton toggleFullScreen={toggleFullScreen} titleDescription={'阳山县2m遥感影像图'} infoDescription={'地区：清远市阳山县 分辨率：2m 时间：2022年 & 2023年 影像来源：国产公益卫星 — 资源系列、 高分系列 '} />
            </Flex>
        </GuideProvider>
    );
});

export default RSImagery;