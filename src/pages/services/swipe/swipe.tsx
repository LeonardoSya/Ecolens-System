import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Flex, Row, Col, Divider, Typography } from 'antd';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { getRenderPixel } from 'ol/render';
import { fromLonLat } from 'ol/proj';
import Overview from '../overview';
import Floatbutton from '../../../components/floatbutton';
import '../../../assets/styles/map.css';
import 'ol/ol.css';
import './swipe.css';

const { Title, Paragraph, Text, Link } = Typography;
const center = [112.668303857182, 24.46182332334417];
const transformedCenter = fromLonLat(center);
const blockContent1 = `阳山县位于北回归线北侧，属南亚热带向中亚热带过渡的季风气候区，春季温和潮湿，夏季炎热多雨，秋季凉爽干燥，冬季寒冷少雨。由于季风交替的不稳定性，阳山县灾害性天气频繁。阳山县地形复杂，总体地形为南、北高峻，并以单斜山地不规则地由两端向腹地倾斜，形成中间低缓，四周较高的船形地貌。山地约占全县总面积的90%。`
const blockContent2 = `森林资源概况：阳山县林业用地面积2623.88平方千米，占全县土地面积的79.85%。全县森林覆盖率为72.97%,林木绿化率为76.5%，活立木总蓄积量8247485立方米。阳山县省级生态公益林居全省之首，面积达1626.69平方千米。松树资源数据：阳山县现有松林面积76.5万亩，其中包括纯松林48.8万亩，针阔混交林17.6万亩，针叶混交林10.1万亩。此外，阳山县是松材线虫病疫区，这种疫病对松树资源构成了严重威胁。为了防治松材线虫病，阳山县采取了一系列措施，包括对山上病死松树进行伐除、焚烧和药剂除害处理，以及利用飞机喷洒药物杀死松褐天牛等媒介昆虫。`

const Swipe: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>();
    const [swipe, setSwipe] = useState<number>(50);

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

        const osmLayer = new TileLayer({
            source: new OSM(),
        });

        const key = 'TZSZyGDj9GmOgxlhADBU';
        // 版权信息
        const attributions = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
            '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

        const aerialLayer = new TileLayer({
            source: new XYZ({
                attributions: attributions,
                url: `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${key}`,
                maxZoom: 20,
            }),
        });

        const initialMap = new Map({
            controls: [],
            layers: [osmLayer, aerialLayer],
            target: mapRef.current,
            view: new View({
                center: transformedCenter,
                zoom: 6,
            }),
        });

        setMap(initialMap);

        return () => initialMap.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (!map) return;

        const aerialLayer = map.getLayers().getArray()[1] as TileLayer<XYZ>;  // TileLayer类需要一个类型参数来指定其所使用的源类型

        const handleSwipe = (e: any) => {
            const ctx = e.context;
            const mapSize = map.getSize();
            if (!mapSize) return;

            const width = mapSize[0] * (swipe / 100);
            const tl = getRenderPixel(e, [width, 0]);
            const tr = getRenderPixel(e, [mapSize ? mapSize[0] : 0, 0]);
            const bl = getRenderPixel(e, [width, mapSize ? mapSize[1] : 0]);
            const br = getRenderPixel(e, mapSize ? mapSize : [0, 0]);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tl[0], tl[1]);
            ctx.lineTo(bl[0], bl[1]);
            ctx.lineTo(br[0], br[1]);
            ctx.lineTo(tr[0], tr[1]);
            ctx.closePath();
            ctx.clip();
        }

        aerialLayer.on('prerender', handleSwipe);
        aerialLayer.on('postrender', (e: any) => e.context.restore());

        map.renderSync();

        return () => {
            aerialLayer.un('prerender', handleSwipe);
            aerialLayer.un('postrender', (e: any) => e.context.restore());
        }
    }, [swipe, map]);

    return (
        <Flex vertical gap='large'>

            <Flex style={{ width: "90%" }}>
                <Typography style={{ position: 'relative', left: '5%' }}>
                    <Title level={3}>阳山县概况</Title>
                    <Paragraph>
                        <blockquote>
                            {blockContent1}
                        </blockquote>
                    </Paragraph>
                    <Title level={3}>森林资源概况</Title>
                    <Paragraph>
                        <blockquote>
                            {blockContent2}
                        </blockquote>
                    </Paragraph>
                </Typography>
            </Flex>

            <Flex gap='large' justify='space-around' align='flex-start' style={{ padding: '0 2rem' }}>
                <Flex gap="small" vertical style={{ width: '50%', }}>
                    <Row justify="center" align="top">
                        <Col span={8}>
                            <span style={{ fontSize: '1.2rem' }}>
                                🕹️ 拖动滑块查看
                            </span>
                        </Col>
                        <Col span={6}>
                            <div className="PB-range-slider-div">
                                <input onChange={(e) => setSwipe(Number(e.target.value))} type="range" min="0" max="100" value={swipe} className="PB-range-slider" id="myRange" />
                            </div>
                        </Col>
                        <Col span={5} />
                    </Row>
                    <div ref={mapRef} className='swipe-map-container' />
                    <Floatbutton toggleFullScreen={toggleFullScreen}
                        infoDescription='阳山县位于北回归线北侧，属南亚热带向中亚热带过渡的季风气候区，春季温和潮湿，夏季炎热多雨，秋季凉爽干燥，冬季寒冷少雨。由于季风交替的不稳定性，阳山县灾害性天气频繁。阳山县地形复杂，总体地形为南、北高峻，并以单斜山地不规则地由两端向腹地倾斜，形成中间低缓，四周较高的船形地貌。山地约占全县总面积的90%。
森林资源概况：阳山县林业用地面积2623.88平方千米，占全县土地面积的79.85%。全县森林覆盖率为72.97%,林木绿化率为76.5%，活立木总蓄积量8247485立方米。阳山县省级生态公益林居全省之首，面积达1626.69平方千米。松树资源数据：阳山县现有松林面积76.5万亩，其中包括纯松林48.8万亩，针阔混交林17.6万亩，针叶混交林10.1万亩。此外，阳山县是松材线虫病疫区，这种疫病对松树资源构成了严重威胁。为了防治松材线虫病，阳山县采取了一系列措施，包括对山上病死松树进行伐除、焚烧和药剂除害处理，以及利用飞机喷洒药物杀死松褐天牛等媒介昆虫。'
                        titleDescription='阳山县概况'
                    />
                </Flex>

                <Flex vertical gap="large" justify='space-around' align='center' style={{ width: '50%', marginTop: '2rem' }}>
                    <Overview />
                </Flex>

            </Flex>
        </Flex>

    )
}

export default Swipe;