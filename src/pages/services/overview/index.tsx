import React from 'react';
import { Col, Row } from 'antd';
import G23d from './g2-3d';
import Area from './area';
import CardComponent from './card-component';
import Pathln from './pathln';
import MiniArea from './mini-area';
import { Plots, ndviLinear } from '../../../assets/images/images';
import { ChartProvider } from '../../../models/chart-context';

const Overview: React.FC = () => {
    return (
        <>
            <Row justify="space-evenly">
                <Col span={5}>
                    <MiniArea
                        title='植被指数'
                        description='2000-2020清远市NDVI年际变化'
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='归一化植被系数拟合'
                        description='2000-2020清远市NDVI线性拟合'
                        coverImage={ndviLinear}
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='植被系数分类占比'
                        description='2000-2020清远市NDVI分类占比'
                        coverImage={Plots}
                    />
                </Col>
                <Col span={5}>
                    <ChartProvider>
                        <Pathln
                            title='森林储蓄量'
                            description='清远市2000-2020森林储蓄量 (万立方米)'
                        />
                    </ChartProvider>
                </Col>
            </Row>
            <Row justify="space-evenly">
                <Col span={10}><G23d /></Col>
                <Col span={10}><Area /></Col>
            </Row>
        </>
    );
}

export default Overview;