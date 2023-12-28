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
            <Floatbutton toggleFullScreen={toggleFullScreen} infoDescription={'this is ndvi&temp page'} />
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