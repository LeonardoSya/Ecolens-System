import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import Floatbutton from '../../../components/floatbutton';
import Loader from '../../../components/loader';
import 'ol/ol.css';
import '../../../assets/styles/map.css';

interface WMSMapProps {
    geoServerUrl: string;
    layers: string;
}

interface MapContainerProps {
    date: string;
    workspace: string;
}

const protocol = 'wms';
const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

const WMSMap: React.FC<WMSMapProps> = React.memo(({ geoServerUrl, layers }) => {
    const mapRef = useRef<Map | null>(null);            // 持有 ol/Map 实例
    const mapContainerRef = useRef<HTMLDivElement>(null);   // 持有地图容器DOM元素的ref
    const [isLoading, setIsLoading] = useState<boolean>(false);
    let timeoutId: number | null | undefined = null;
    const initialCenter: [number, number] = [112.65, 24.4];
    const initialZoom = 8;
    const extent = [111.80036767426553, 23.946345613009882, 113.48241812801513, 25.018395073078118]

    const toggleFullScreen = () => {
        const mapElement = mapContainerRef.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const wmsSource = new TileWMS({
            url: geoServerUrl,
            params: {
                'LAYERS': layers,   // LAYERS: '工作空间名称:图层名称'  
                'TILED': true,   // TILED: 是否使用瓦片(tiled)模式获取地图
                'VERSION': '1.1.1',
                'FORMAT': 'image/jpeg'
            },
            serverType: 'geoserver',
        });

        wmsSource.on('tileloadstart', () => {
            console.log('start')
            setIsLoading(true);
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                setIsLoading(false);
                timeoutId = null;
            }, 3000);
        });

        const wmsLayer = new TileLayer({
            source: wmsSource,
        });

        const map = new Map({
            controls: [],
            target: mapContainerRef.current,
            layers: [wmsLayer],
            view: new View({
                projection: 'EPSG:4326',
                center: initialCenter,
                zoom: initialZoom,
                minZoom: initialZoom + 2,
                maxZoom: initialZoom + 9,
                extent: extent,
                rotation: 0,
            })
        });

        mapRef.current = map;  // 持有ol/Map实例

        setTimeout(() => {
            map.updateSize();

            const view = map.getView();
            view.setCenter(initialCenter);
            view.setZoom(initialZoom + 3);
        }, 100);

        if (mapContainerRef.current) {
            map.setTarget(mapContainerRef.current);

            // 延迟更新地图大小
            setTimeout(() => {
                map.updateSize();

                const view = map.getView();
                view.setCenter(initialCenter);
                view.setZoom(initialZoom + 3);
            }, 100);

            map.on('change', () => {
                console.log('Map view changed:', map.getView().getCenter(), map.getView().getZoom());
            });
        }

        return () => {
            mapRef.current?.setTarget(undefined);
            mapRef.current = null;
        }
    }, [geoServerUrl, layers,]);

    return (
        <>
            <Loader isLoading={isLoading} />
            <Floatbutton toggleFullScreen={toggleFullScreen} titleDescription={'归一化植被指数 20年研究成果'} infoDescription={'该项目选取了阳山县作为研究区域，时间范围为2002年1月至2022年12月。获取Sentinel-2和MODIS影像数据。使用了GEE平台提供的Sentinel-2 Level-2A和MODIS MOD13Q1数据集，分别具有10m和250m的空间分辨率，以及5天和16天的时间分辨率。对Sentinel-2影像矫正、裁剪和对波段进行NDVI值计算(float(b8)-float(b4))/(float(b8)+float(b4))，得到15m中分辨率NDVI影像。为了减少云层的干扰，进行了云掩膜处理，只保留了云量小于10%的影像。通过获取modis卫星产品，得到阳山县区域20年时间跨度的30天NDVI影像。对比分析植被指数变化。从空间和时间两个方面对比了Sentinel-2和MODIS影像的NDVI变化。从空间方面，本文选取了阳山县的几个受松材线虫影响和自然状态下的典型样点，分别将其放入监督分类样本集，分析了几个样本间的差值，在空间角度上对比受线虫影响区域的NDVI变化，并将规律性结果投射至整个阳山区域。从时间方面，分别对两种影像的NDVI值进行了时间序列合成，得到了月尺度和季节尺度的NDVI值，绘制了两者的NDVI值的变化曲线。在空间上，通过对NDVI影像的直方图分析，可以发现该区域的NDVI值呈现出双峰分布，其中一个峰值约为0.3，另一个峰值约为0.6。这说明该区域的松树存在两种不同的生长状态，一种是健康的松树林，其NDVI值较高，另一种是受松材线虫影响的松树林，其NDVI值较低。在时间跨度上，通过对NDVI影像的动态监测，可以发现该区域的松树的NDVI值随着时间的推移呈现出上升的趋势，表明尽管松材线虫病对松树的生长造成了持续的负面影响，但在多年对松材线虫的防控和对森林资源的补充下，对抗松材线虫成果显著。'} />
            <div ref={mapContainerRef} className='map-container'></div>
        </>
    );

});


const MapContainer: React.FC<MapContainerProps> = ({ date, workspace }) => {
    const layers = `${workspace}:${date}`;
    const geoServerUrl = `${domain}${workspace}/${protocol}`;

    return (
        <WMSMap geoServerUrl={geoServerUrl} layers={layers} />
    );
};

export default MapContainer;