import React, { useEffect, useRef, useMemo } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source'; 
import { get as getProjection,transformExtent } from 'ol/proj';
import { useCreation } from '../hooks/hooks';

import 'ol/ol.css';
import '../../style/map.css';

const workSpace = 'yashixiang';
const date = '2013-03-01';
const protocol = 'wms';
const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

const layers = `${workSpace}:${date}`;
const geoServerUrl = `${domain}${workSpace}/${protocol}`;


const WMSMap = ({ geoServerUrl, layers }) => {

    const mapCotainerRef = useRef(null);
    const initialCenter = [112, 24];
    const initialZoom = 4;

    const mapStore = useCreation(() => {
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
            // loadError: (event) => console.error('Layer failed to load:', event)
        });
        
        // 在TileLayer的定义中添加事件监听来检查图层是否加载
        wmsLayer.on('error', function (event) {
            console.error('WMS Layer failed to load:', event);
        });

        // const extentInEPSG4326 = [111, 23, 114, 26];
        // const extent = transformExtent(extentInEPSG4326, 'EPSG:4326', 'EPSG:3857');

        // 创建地图
        return new Map({
            layers: [wmsLayer],
            view: new View({
                center: initialCenter,
                zoom: initialZoom, 
                projection: getProjection('EPSG:4326'),
                // extent: extent, 
            }),
        });
    }, [geoServerUrl, layers]);

    useEffect(() => {
        if (mapCotainerRef.current) {
            mapStore.setTarget(mapCotainerRef.current);

            // 延迟更新地图大小
            setTimeout(() => {
                mapStore.updateSize();
            }, 100);

            // 打印调试信息
            console.log('Map Size:', mapStore.getSize());
            console.log('View Center:', mapStore.getView().getCenter());
            console.log('View Zoom:', mapStore.getView().getZoom());
            // 添加地图加载错误的监听器
            mapStore.on('change', () => {
                console.log('Map view changed:', mapStore.getView().getCenter(), mapStore.getView().getZoom());
            });

            // 适应性调整视图（可选）
            const view = mapStore.getView();
            view.fit(view.getProjection().getExtent(), {
                size: mapStore.getSize(),
                padding: [10, 10, 10, 10]  // 适当的边距
            });

            // 响应窗口大小变化
            // const resizeViewToFit = () => {
            //     mapStore.updateSize();  // 更新地图大小
            //     view.fit(view.getProjection().getExtent(), {
            //         size: mapStore.getSize(),
            //         padding: [10, 10, 10, 10]  // 适当的边距
            //     });
                
            // };
            // window.addEventListener('resize', resizeViewToFit);

            // return () => {
            //     if (mapStore) {
            //         mapStore.setTarget(undefined);
            //     }
            // }
            // return () => {
            //     window.removeEventListener('resize', resizeViewToFit);
            // };
        }
    }, [mapStore]);

    return <div ref={mapCotainerRef} className='map-container-page2'></div>
}

const Page2 = () => (
    <WMSMap geoServerUrl={geoServerUrl} layers={layers} />
)

export default Page2;