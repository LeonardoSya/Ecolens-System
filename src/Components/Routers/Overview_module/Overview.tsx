import React from 'react';
import { Col, Row } from 'antd';
import G2test3d from './G2test3d';
import Area from "./Area";
import CardComponent from './CardComponent';

import CardImage3 from '../../../assets/images/CardImage-3.png';
import CardImage2 from '../../../assets/images/CardImage-2.png';
import CardImage1 from '../../../assets/images/CardImage-1.png';
import avatar from '../../../assets/images/Avatar.jpg';


const Overview: React.FC = () => {
    return (
        <>
            <Row justify="space-evenly">
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={CardImage3}
                        avatarImage={avatar}
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={CardImage2}
                        avatarImage={avatar}
                    />
                </Col>
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={CardImage1}
                        avatarImage={avatar}
                    /></Col>
                <Col span={5}>
                    <CardComponent
                        title='TiTle'
                        description='在此编辑文案'
                        coverImage={CardImage3}
                        avatarImage={avatar}
                    /></Col>
            </Row>
            <Row justify="space-evenly">
                <Col span={10}><G2test3d /></Col>
                <Col span={10}><Area /></Col>
            </Row>
        </>
    );
}

export default Overview;