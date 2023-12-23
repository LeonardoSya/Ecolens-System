import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Layout, Row, Flex, Typography, Image, Divider } from 'antd';
import { InstagramFilled } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';

import { homepageIcon, reactLogo, viteLogo, antdLogo, babelLogo, tsLogo, GEELogo, } from '../../assets/icons/icons';
import './index.css';

const { Title } = Typography;

const HomepageContent = () => (
    <Content
        style={{
            backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
            padding: "5vh 10vw"
        }}
    >
        <Flex
            justify='center'
            align='center'
        >
            <Card
                style={{
                    background: "inherit",
                    border: "none",
                    width: "500vw"
                }}>
                <Flex
                    vertical
                    wrap="wrap"
                    justify='center'
                    align='flex-start'
                >
                    <Title level={1} style={{ color: "#fff", fontSize: "2.8vw", fontFamily: "Poppins" }} >
                        <span>Kickstart your</span>
                        <br />
                        exploration with
                        <br />
                        <span style={{ color: "#a78bfa", fontFamily: "Shadows Into Light", fontSize: "4.5vw" }}> Ecolens</span>
                    </Title>
                    <Title level={4} style={{ color: "#fff", fontSize: '1.15vw', fontFamily: 'Poppins' }}>
                        🌍 Comprehensive Mapping <br />
                        📡 Remote Sensing Integration <br />
                        🌱 Ecosystem Monitoring <br />
                        🔍 User-Friendly Interface <br />
                        🚀 Kickstart Ecological Journey <br />
                        {/* 🚀 Kickstart Your Ecological Journey <br /> */}
                    </Title>

                    <Link to="/services/overview">
                        <button className="learn-more">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">Start NOW !</span>
                        </button>
                    </Link>

                </Flex>
            </Card>

            <img
                alt='homepage-icon'
                src={homepageIcon}
                className='homepage-icon'
                placeholder='blur'
            />

        </Flex>

        <Divider
            style={{
                marginTop: "8vh",
                color: "#fff",
                fontFamily: "Shadows Into Light",
                fontSize: '2vw',
            }}
        >
            Build with
        </Divider>

        <Row justify="space-around">
            <Col span={3}></Col>
            <Col span={1}>
                <Link to="https://react.docschina.org/" target='_blank'>
                    <img src={reactLogo} className="logo" alt="React logo" />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://vitejs.dev/" target='_blank'>
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://ant.design/index-cn/" target='_blank'>
                    <img src={antdLogo} className="logo" alt="Antd logo" />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://openlayers.org/" target='_blank'>
                    <img src="https://openlayers.org/theme/img/logo-dark.svg" className="logo" alt="openlayers logo" />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://earthengine.google.com/" target='_blank'>
                    <img src={GEELogo} className="logo" alt="GEE logo" style={{ width: '2.3vw', marginTop: '0.2vw' }} />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://www.typescriptlang.org/docs/" target='_blank'>
                    <img src={tsLogo} className="logo" alt="TypeScript logo" />
                </Link>
            </Col>
            <Col span={1}>
                <Link to="https://babeljs.io/repl/" target='_blank'>
                    <img src={babelLogo} className="logo" alt="BABEL logo" style={{ width: '2.3vw', marginLeft: '-0.3vw' }} />
                </Link>
            </Col>
            <Col span={3}></Col>

        </Row>
    </Content>
);



export default HomepageContent;