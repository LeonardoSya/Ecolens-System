import React from 'react';
import { Col, Row } from 'antd';
import { } from '@ant-design/charts';
import ThumbnailAxisStackedChart from './ThumbnailAxisStackedChart';
import AnimatedLineChart from './AnimatedLineChart';
import G2test from './G2test';

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
                <Col span={10}><G2test /></Col>
                <Col span={10}></Col>
            </Row>
        </>
    );
}

export default Overview;