import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import 'ol/ol.css';
import '../../style/map.css'

// URL and related parameters extracted as constants(提取成为常量
const tileLayerBaseUrls = {
    yangshan1: 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/e8826544-2b17-478c-b7bc-9523a8489777',
    yangshan2: 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/02067963-3cde-46b5-ab9d-b64247a5fbbf',
    yangshan3: 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/66ba550a-a9f6-473e-af66-d22d8d1d1a9b',
    yangshan4: 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/a91ffe76-5903-4911-9cc9-18b3fb4651a6',
};
const BASE_URL = 'http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/61f9b270-a42c-4d9e-a9dc-ac3af586b313';
const PATH_TEMPLATE = '/{z}/{x}/{y}/tile.png';
const QUERY_PARAMS = '?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2';

const TILE_LAYER_URL = `${BASE_URL}${PATH_TEMPLATE}${QUERY_PARAMS}`;
const TILE_LAYER_PROJECTION = 'EPSG:4326';
const TILE_LAYER_ATTRIBUTIONS = '松材线虫无人机影像';
const TILE_LAYER_CROSS_ORIGIN = 'anonymous'

const initialZoom = 9;
const initialCenter = [12557291.408831256, 2766116.434460827];

const Xylophilus = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const map = new Map({
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    extent: [12405068.682639811, 2653037.9382806667, 12706225.178468876, 2872899.1673065587],
                    source: new XYZ({
                        /**
                         * 图层服务加了网关权限校验，校验请求头中referer 是127.0.0.1的才能访问，所以目前必须以127.0.0.1访问地图页面
                         */
                        url: TILE_LAYER_URL,
                        projection: TILE_LAYER_PROJECTION,
                        attributions: TILE_LAYER_ATTRIBUTIONS,
                        crossOrigin: TILE_LAYER_CROSS_ORIGIN,
                    })
                })
            ],
            view: new View({
                center: initialCenter,
                zoom: initialZoom,
            })
        });
        return () => map.setTarget(undefined);
    }, []);

    return <div ref={mapRef} className='map-container-page1' />;
}


export default Xylophilus;