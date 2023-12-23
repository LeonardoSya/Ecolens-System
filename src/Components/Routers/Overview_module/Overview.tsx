import React from 'react';
import { Col, Row } from 'antd';
import G2test3d from './G2test3d';
import Area from "./Area";
import CardComponent from './CardComponent';
import Pathln from './Pathln';
import MiniArea from './MiniArea';
import {  cardImage3, cardImage4, avatar } from '../../../assets/images/index-image';

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
                        title='TiTle'
                        description='在此编辑文案'
                        avatarImage={avatar}
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={cardImage3}
                        avatarImage={avatar}
                    /></Col>
                <Col span={5}>
                    <Pathln
                        title='TiTle'
                        description='在此编辑文案'
                        avatarImage={avatar} />
                </Col>
            </Row>
            <Row justify="space-evenly">
                <Col span={10}><G2test3d /></Col>
                <Col span={10}><Area /></Col>
            </Row>
        </>
    );
}

export default Overview;