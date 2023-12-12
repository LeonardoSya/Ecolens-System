import React, { useState, useRef, useEffect } from 'react';
import { ZoomInOutlined, ZoomOutOutlined, SyncOutlined } from '@ant-design/icons';
import { FloatButton, Layout } from 'antd';
import {useSafeState} from '../hooks/hooks';

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'

import '../../style/map.css';

const Page1 = ({ zoom, onZoomChange }) => {
    const [map, setMap] = useSafeState();
    const [featuresLayer, setFeaturesLayer] = useSafeState();
    // const [selectedCoord, setSelectedCoord] = useState();
    const mapElement = useRef();
    // 使用useRef存储初始化地图的引用，确保组件在重新渲染时能够访问到正确的地图实例
    // const mapRef = useRef(null);

    // let centerPos = transform([116.35, 40.01], 'EPSG:4326', 'EPSG:3857')  // 4326:WGS84地理坐标系 3857伪墨卡托投影

    // 在第一次渲染初始化map之前 放入componentDidMount
    useEffect(() => {

        // create & add 矢量源图层 Vector source layer
        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource()
        })

        // create map
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                // USGS Topo
                new TileLayer({
                    source: new XYZ({
                        url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                    })
                }),
                initalFeaturesLayer,
            ],
            view: new View({
                projection: 'EPSG:4326', // WGS84
                center: [-70, 38],
                zoom: zoom,
            }),
            controls: [],
        });

        // 将地图和矢量图层保存到state
        setMap(initialMap);
        setFeaturesLayer(initalFeaturesLayer);

        // 将地图实例存储在ref中
        // mapRef.current = initialMap;
        const view = initialMap.getView();

        // 添加缩放监听器，当缩放级别变化时，调用onZoomChange更新状态
        const handleResolutionChange = () => {
            const newZoom = view.getZoom();
            console.log('zoom changed:', newZoom);
            onZoomChange(newZoom);
        }
        view.on('change:resolution', handleResolutionChange);

        return () => {
            view.un('change:resolution', handleResolutionChange);
        };
    }, [zoom, onZoomChange]);

    const handleZoomIn = () => {
        const view = map.getView();
        const currentZoom = view.getZoom();
        view.setZoom(currentZoom + 1);
    };
    const handleZoomOut = () => {
        const view = map.getView();
        const currentZoom = view.getZoom();
        view.setZoom(currentZoom - 1);
    };

    // 如果 features 属性发生变化，则更新地图 - 之前放置在 componentDidUpdate 中的逻辑
    // useEffect(() => {
    //     if (props.features.length) {  // 可能在首次渲染时为空
    //         // 在地图中设置要素
    //         featuresLayer.setSource(
    //             new VectorSource({
    //                 features: props.features  // 验证要素是 array
    //             })
    //         )
    //         // 适合地图的要素范围
    //         // map.geiView().fit(featuresLayer.getSource().getExtent(), {
    //         //     padding: [100, 100, 100, 100]
    //         // })
    //     }
    // }, [props, featuresLayer, map])


    return (
        <>
            <div ref={mapElement} className='map-container-page1' />
            <FloatButton.Group
                shape='circle'
                style={{ right: 24 }}
            >
                <FloatButton onClick={handleZoomIn} icon={< ZoomInOutlined />} />
                <FloatButton onClick={handleZoomOut} icon={< ZoomOutOutlined />} />
                <FloatButton />
                <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} />
                <FloatButton.BackTop visibilityHeight={70} />
            </FloatButton.Group>
        </>
    );
}

export default Page1;