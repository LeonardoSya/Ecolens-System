import React, { useEffect, useRef, useCallback } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ, OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import '../../../assets/styles/map.css';
import 'ol/ol.css';
import Floatbutton from '../../../components/floatbutton';

const url = '../../assets/data/yangshan_geo.geojson';
const center = [112.678303857182, 24.341823323344173];
const transformedCenter = fromLonLat(center);

const Boundary: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = useCallback(() => {
        const mapElement = mapRef.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const vectorSource = new VectorSource({
            url: url,
            format: new GeoJSON(),
        });

        const map = new Map({
            controls: [],
            target: mapRef.current,
            layers: [
                // 添加OSM源的 base map 底图
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: vectorSource,
                }),
            ],
            view: new View({
                center: transformedCenter,
                zoom: 10,
            }),
        });

        vectorSource.on('featuresloadend', () => {
            alert('GeoJSON features have been loaded and rendered');
        })

        return () => map.setTarget(undefined);
    }, []);

    return (
        <>
            <div ref={mapRef} className='map-container'></div>
            <Floatbutton toggleFullScreen={toggleFullScreen}
                infoDescription='阳山县位于北回归线北侧，属南亚热带向中亚热带过渡的季风气候区，春季温和潮湿，夏季炎热多雨，秋季凉爽干燥，冬季寒冷少雨。由于季风交替的不稳定性，阳山县灾害性天气频繁。阳山县地形复杂，总体地形为南、北高峻，并以单斜山地不规则地由两端向腹地倾斜，形成中间低缓，四周较高的船形地貌。山地约占全县总面积的90%。
森林资源概况：阳山县林业用地面积2623.88平方千米，占全县土地面积的79.85%。全县森林覆盖率为72.97%,林木绿化率为76.5%，活立木总蓄积量8247485立方米。阳山县省级生态公益林居全省之首，面积达1626.69平方千米。松树资源数据：阳山县现有松林面积76.5万亩，其中包括纯松林48.8万亩，针阔混交林17.6万亩，针叶混交林10.1万亩。此外，阳山县是松材线虫病疫区，这种疫病对松树资源构成了严重威胁。为了防治松材线虫病，阳山县采取了一系列措施，包括对山上病死松树进行伐除、焚烧和药剂除害处理，以及利用飞机喷洒药物杀死松褐天牛等媒介昆虫。'
                titleDescription='阳山县概况'
            />
        </>
    )
}

export default Boundary;