import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import '../../style/map.css';


const Page2 = () => {
    useEffect(() => {
        // GeoServer WMS 地图服务的 url
        const geoServerUrl = ''

        // 创建WMS图层
        const wmsLayer = new TileLayer({
            source: new TileWMS({
                url: geoServerUrl,
                params: {
                    'LAYERS': 'sorano:layer_name',   // LAYERS: '工作空间名称:图层名称'  
                    'TILED': true,   // TILED: 是否使用瓦片(tiled)模式获取地图
                    'VERSION':'1.1.1',  // wms版本
                    'FORMAT':'image/jpeg'
                },
                serverType: 'geoserver'
            }),
        });

        // 创建地图
        const map = new Map({
            layers: [new OSM(), wmsLayer],
            target: 'map',
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        return () => {
            // 在组件卸载时清理地图资源
            map.dispose();
        };
    }, []);  // 只在组件挂载时运行

    return (
        <div className='map-container-page2'></div>
    );
}

export default Page2;