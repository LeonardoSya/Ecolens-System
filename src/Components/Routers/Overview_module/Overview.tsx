import React from 'react';
import { Col, Row } from 'antd';
import { } from '@ant-design/charts';
import ThumbnailAxisStackedChart from './ThumbnailAxisStackedChart';
import AnimatedLineChart from './AnimatedLineChart';
import G2test from './G2test';
import ScatterPlot from './ScatterPlot';
import G2test3d from './G2test3d';
import Area from "./Area";

const Overview: React.FC = () => {
    return (
        <>
            <Row justify="space-evenly">
                <Col span={5}>111</Col>
                <Col span={5}>111</Col>
                <Col span={5}>111</Col>
                <Col span={5}>111</Col>
            </Row>
            <Row justify="space-evenly">
                <Col span={10}><G2test3d /></Col>
                <Col span={10}><Area /></Col>
            </Row>
        </>
    );
}

export default Overview;