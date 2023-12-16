import React from 'react';
import { Col, Row } from 'antd';
import { } from '@ant-design/charts';
import ThumbnailAxisStackedChart from './ThumbnailAxisStackedChart';

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
                <Col span={10}><ThumbnailAxisStackedChart /></Col>
                <Col span={10}></Col>
            </Row>
        </>
    );
}

export default Overview;