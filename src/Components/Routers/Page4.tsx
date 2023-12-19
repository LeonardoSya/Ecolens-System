import React, { useEffect, useRef } from 'react';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import { OSM, TileWMS } from 'ol/source';


import '../../style/map.css';
import 'ol/ol.css'

const Page4 = () => {
    // 创建一个ref，指向地图的容器元素
    const mapElement = useRef(null);

    // 使用useEffect钩子，在组件挂载后初始化地图
    useEffect(() => {
        // 创建图层
        const layers = [
            new TileLayer({
                source: new OSM(),
            }),
            new TileLayer({
                // extent: [-13884991, 2870341, -7455066, 6338219],
                source: new TileWMS({
                    url: 'https://electric-duly-peacock.ngrok-free.app/geoserver/yashixiang/wms',
                    params: { 'LAYERS': 'yashixiang: 2023-06-01', 'TILED': true },
                    serverType: 'geoserver',
                    // Countries have transparency, so do not fade tiles:
                    // transition: 0,
                }),
            }),
        ];

        // 创建地图
        const map = new Map({
            layers: layers,
            target: mapElement.current,
            view: new View({
                center: [0,0],
                zoom: 4,
            }),
        });

        // 在组件卸载时清理地图资源
        return () => {
            map.dispose();
        };
    }, []); // 只在组件挂载时运行

    // 返回渲染的<div>元素
    return (
        <div ref={mapElement} className='map-container-page4'></div>
    );
}

export default Page4;
