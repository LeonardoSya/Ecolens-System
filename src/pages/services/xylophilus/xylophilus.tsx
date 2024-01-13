import React, { useCallback, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Flex, Row, Col, message } from 'antd';
import Floatbutton from '../../../components/floatbutton';
import { useSafeState, useCreation } from '../../../hooks/hooks';
import Loader from '../../../components/loader';
import 'ol/ol.css';
import '../services.css';
import './index.css';
import '../../../assets/styles/map.css'

const mapInfo = [
    { id: 'id', center: [112.61178989861932, 24.49146364092972], zoom: 18.5, label: "测区1", index: 0 },
    { id: 'id', center: [112.654095, 24.462341], zoom: 17.5, label: "测区2", index: 1 },
    { id: 'id', center: [112.661316, 24.474848], zoom: 17.9, label: "测区3", index: 2 },
    { id: 'id', center: [112.619898, 24.432980], zoom: 16.9, label: "测区4", index: 3 },
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

const Xylophilus: React.FC = React.memo(() => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [item, setItem] = useSafeState(mapInfo[0]);
    const [isLoading, setIsLoading] = useSafeState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    let timeoutId: number | null | undefined = null;

    const toggleFullScreen = useCallback(() => {
        const mapElement = mapRef?.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    const toggleItem = useCallback((index: number) => {
        setItem(mapInfo[index]);
        infoMessage(mapInfo[index]);
    }, []);

    interface seletedItemProps {
        id?: string;
        center?: number[];
        zoom?: number;
        label: any;
        index?: number;
    }

    const infoMessage = (selectedItem: seletedItemProps) => {
        messageApi.info(`您已切换至${selectedItem.label}界面`);
    };

    const transformedCenter = useCreation(() => fromLonLat(item.center), [item.center])

    useEffect(() => {
        if (!mapRef.current || !item) return;

        const xyzSource = new XYZ({
            url: `url`,
            projection: 'EPSG:4326',
            crossOrigin: 'anonymous',
        });

        xyzSource.on('tileloadstart', () => {
            setIsLoading(true);
            console.log('start')
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = window.setTimeout(() => {
                setIsLoading(false);
                timeoutId = null;
            }, 3000);
        });

        const map = new Map({
            controls: [],
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: xyzSource,
                }),
            ],
            view: new View({
                center: transformedCenter,
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
            <Loader isLoading={isLoading} />
            <Flex gap="small" vertical>
                <Row justify="center" align="top">
                    <Col span={8}>
                        <span style={{ fontSize: '1.3vw' }}>
                            🔍松材线虫害受灾区域监测图
                        </span>
                    </Col>
                    <Col span={10}>
                        <div className='radio-buttons-container'>
                            {mapInfo.map((item, index) => (
                                <div className="radio-button" key={index}>
                                    <input
                                        name="radio-group"
                                        id={`radio${index}`}
                                        className="radio-button__input"
                                        type="radio"
                                        onChange={() => { toggleItem(index); }}
                                    />
                                    <label htmlFor={`radio${index}`} className="radio-button__label">
                                        <span className="radio-button__custom"></span>
                                        {item.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Floatbutton toggleFullScreen={toggleFullScreen} titleDescription='松材线虫受灾区无人机监测影像' infoDescription={'空间引用标识符（SRID/EPSG）：4326 图像宽度：256 图像高度：256 瓦片数量：128 缩放级别：14-21 第一张 (2023年11月18日) 图片数量：36张 分辨率：0.058米 第二张 (2023年11月18日) 图片数量：197张 分辨率：0.089米 第三张 (2023年11月19日) 图片数量：120张 分辨率：0.113米 第四张 (2020年11月20日) 图片数量：119张 分辨率：0.126米'} />
                <div ref={mapRef} className='map-container' style={{ background: '#000000cc' }} ></div>
            </Flex>

        </>
    )
});
export default Xylophilus;