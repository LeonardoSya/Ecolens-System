import React from 'react';
import { Col, Row } from 'antd';
import G23d from './g2-3d';
import Area from './area';
import CardComponent from './card-component';
import Pathln from './pathln';
import MiniArea from './mini-area';
import { cardImage4, avatar, ndviLinear, ndviOverallTrend } from '../../../assets/images/images';
import { ChartProvider } from '../../../models/chart-context';
import Honeycomb from './honeycomb-heat-map';

const Overview: React.FC = () => {
    return (
        <>
            <Row justify="space-evenly">
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={cardImage4}
                        avatarImage={avatar}
                    />
                </Col>
                <Col span={5}>
                    <MiniArea
                        title='植被指数'
                        description='2000-2020清远市NDVI年际变化'
                        avatarImage={avatar}
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='归一化植被系数拟合'
                        description='2000-2020清远市NDVI线性拟合'
                        coverImage={ndviOverallTrend}
                        avatarImage={avatar}
                    /></Col>
                <Col span={5}>
                    <ChartProvider>
                        <Pathln
                            title='森林储蓄量'
                            description='清远市2000-2020森林储蓄量 (万立方米)'
                            avatarImage={avatar} />
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