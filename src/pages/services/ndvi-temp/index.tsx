import React, { Suspense, lazy, ReactElement } from 'react';
import { Flex, Row, Col } from 'antd';
import { useSafeState } from '../../../hooks/hooks';
import MapSelector from './map-selector';

// MapContainer组件 懒加载
const MapContainer = lazy(() => import('./map-container'));

const QuarterlyChart: React.FC = React.memo((): ReactElement => {
    const [date, setDate] = useSafeState<string>('2022-12-01');
    const [workspace, setWorkspace] = useSafeState<string>('NDVI_sentinel');

    const handleNDVISelect = (newDate: string) => {
        setDate(newDate);
        setWorkspace('NDVI_sentinel');
    }

    const handleTemperatureSelect = (newDate: string) => {
        setDate(newDate);
        setWorkspace('yashixiang');
    }

    return (
        <Flex gap="middle" vertical style={{ background: " linear-gradient(0deg, #000000cc 0%, #4b5876 60%, #f5f5f5 90%)" }}>
            <Row justify="center" align="middle">
                <Col span={4} style={{ fontFamily: 'Poppins' }}><span style={{ fontSize: '1vw', color: '#389e0d' }}>NDVI </span> on a quarterly basis</Col>
                <Col span={4}><MapSelector onSelect={handleNDVISelect} startDate='2018-03-01' endDate='2023-03-01' /></Col>
                <Col span={3}></Col>
                <Col span={6} style={{ fontFamily: 'Poppins' }}><span style={{ fontSize: '1vw', color: '#d4380d' }}>TEMPERATURE </span> on a quarterly basis</Col>
                <Col span={4}><MapSelector onSelect={handleTemperatureSelect} startDate='2013-03-01' endDate='2023-06-01' /></Col>
            </Row>

            <Suspense fallback={<div>Loading Map...</div>}>
                <MapContainer date={date} workspace={workspace} />
            </Suspense>
        </Flex>
    );
});

export default QuarterlyChart;