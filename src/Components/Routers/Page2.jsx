import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';

import 'ol/ol.css';
import '../../style/map.css';


const Page2 = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        // GeoServer WMS 地图服务的 url
        const geoServerUrl = 'https://electric-duly-peacock.ngrok-free.app/geoserver/yashixiang/wms';
        const layers = 'yashixiang:2023-06-01';

        // 创建WMS图层
        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: geoServerUrl,
                params: {
                    'LAYERS': layers,   // LAYERS: '工作空间名称:图层名称'  
                    'TILED': true,   // TILED: 是否使用瓦片(tiled)模式获取地图
                    'VERSION': '1.1.1',  // wms版本
                    'FORMAT': 'image/jpeg'  // 影像格式
                },
                serverType: 'geoserver'
            }),
        });

        // 创建地图
        const map = new Map({
            layers: [wmsLayer],
            target: mapContainerRef.current,
            view: new View({
                center: [0, 0],
                zoom: 3,
            }),
        });

        // 在组件挂载后设置地图中心
        map.getView().setCenter([0, 0]);

        return () => {
            // 在组件卸载时清理地图资源
            map.dispose();
        };
    }, []);  // 只在组件挂载时运行

    return (
        <div ref={mapContainerRef} className='map-container-page2'></div>
    );
}

export default Page2;