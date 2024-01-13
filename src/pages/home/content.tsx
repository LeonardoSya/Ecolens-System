import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Flex, Typography, Divider } from 'antd';
import { } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
// @ts-ignore
import { homepageIcon, reactLogo, viteLogo, antdLogo, babelLogo, tsLogo, GEELogo, Ol } from '../../assets/icons/icons.js';
import './index.css';

const { Title } = Typography;

const HomepageContent: React.FC = () => (
    <Content
        style={{
            backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
            padding: "5vh 12vw"
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
                    width: "500vw",
                    marginBottom:'2vw'
                }}>
                <Flex
                    vertical
                    wrap="wrap"
                    justify='center'
                    align='flex-start'
                >
                    <Title level={1} style={{ color: "#fff", fontSize: "3.5vw" }} >
                        <span>Kickstart your</span>
                        <br />
                        exploration with
                        <br />
                        <span style={{ color: "#a78bfa", fontSize: "6vw" }}> Ecolens</span>
                    </Title>
                    <Title level={4} style={{ color: "#fff", fontSize: '1.8vw', fontWeight: 500, letterSpacing:'0.2rem' }}>
                        🌍 下一代地图平台 <br />
                        📡 即时的遥感影像 <br />
                        🌱 全面的生态监测 <br />
                        🔍 高分辨率的地图 <br />
                        🚀 开启你的生态之旅！  <br />
                        {/* 🚀 Kickstart Your Ecological Journey <br /> */}
                    </Title>

                    <Link to="/services/swipe">
                        <button className="learn-more">
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text">立刻体验！</span>
                        </button>
                    </Link>

                    {/* <Link to="/spotlight">
                        <button className="learn-more" style={{ top: "1.5vw" }}>
                            <span className="circle" aria-hidden="true" style={{ background: "#efdbff" }}>
                                <span className="icon arrow"></span>
                            </span>
                            <span className="button-text" style={{ color: '#000' }}>?? 12.25 ??</span>
                        </button>
                    </Link> */}

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
                margin: "3vw 0",
                color: "#fff",
                fontSize: '1.6vw',
                letterSpacing:'0.3vw'
            }}
        >
            产品技术栈
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
                    <img src={Ol} className="logo" alt="openlayers logo" />
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