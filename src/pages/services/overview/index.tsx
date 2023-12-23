import React from 'react';
import { Col, Row } from 'antd';
import G23d from './g2-3d';
import Area from "./area";
import CardComponent from './card-component';
import Pathln from './pathln';
import MiniArea from './mini-area';
import { cardImage3, cardImage4, avatar } from '../../../assets/images/images';

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
                <Col span={10}><G23d /></Col>
                <Col span={10}><Area /></Col>
            </Row>
        </>
    );
}

export default Overview;