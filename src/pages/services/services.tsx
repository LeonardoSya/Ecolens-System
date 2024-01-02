import React, { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, To } from 'react-router-dom';
import { Col, Row, ColorPicker, ConfigProvider, Flex, Button, Layout, Menu, theme, Typography, Tooltip } from 'antd';
import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, LineChartOutlined, RadarChartOutlined, SlidersOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, GithubOutlined, WechatFilled, CodeFilled, FileFilled } from '@ant-design/icons';
import { Introduction, Overview, Xylophilus, QuarterlyChart, Swipe, RSImagery } from './services-routers';
import { useSafeState } from '../../hooks/hooks';
import { JSX } from 'react/jsx-runtime';
import './search-input.css';


const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Services: React.FC = () => {
    const [primary, setPrimary] = useSafeState('#262626');
    const [collapsed, setCollapsed] = useSafeState(false);
    const togglePrimaryColor = (color: string) => {
        setPrimary(color)
    }
    const toggleCollapsed = () => {
        collapsed ? setCollapsed(false) : setCollapsed(true);
    }

    return (
        <ConfigProvider theme={{ token: { colorPrimary: primary, } }}>
            <Layout>
                <MySider collapsed={collapsed} />
                <Layout>
                    <MyHeader primary={primary} togglePrimaryColor={togglePrimaryColor} />
                    <MySearchModule collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                    <MyMap style={{ width: '100vw' }} />
                    <Footer style={{ textAlign: 'center', background: 'rgba(0,0,0,.8)', color: '#bfbfbf' }}>
                        Ecolens System ©2023 Created by Zhangyiyang
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}


function getItem(label: string, key: string, icon: JSX.Element, path: string) {
    return {
        label, key, icon, path
    };
}

const items = [
    getItem('遥感影像', '1', <AreaChartOutlined style={{ fontSize: 20 }} />, "/services/rsimagery"),
    getItem('虫害监测', '2', <DotChartOutlined style={{ fontSize: 20 }} />, "/services/xylophilus"),
    getItem('区域概况', '3', <LineChartOutlined style={{ fontSize: 20 }} />, "/services/swipe"),
    getItem('生态状况', '4', <BarChartOutlined style={{ fontSize: 20 }} />, "/services/ndvitemp"),
    getItem('监控分析', '5', <PieChartOutlined style={{ fontSize: 18 }} />, "/services/overview"),
    getItem('产品文档', '6', <SlidersOutlined style={{ fontSize: 20 }} />, "/services/introduction"),
    // getItem('Page 7', '7', <RadarChartOutlined style={{ fontSize: 20 }} />, "/services/page5"),
];

const MySider = ({ collapsed }: { collapsed: boolean }) => {
    const renderMenuItems = (menuItems: any[]) => {
        return menuItems.map((item: { key: Key | null | undefined; icon: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; path: To; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: "1.1rem", fontFamily: "Noto Sans SC" }}>
                <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
        ));
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#2d5676", }}>
            <div className='demo-log-vertical' />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 60%)" }} >
                {renderMenuItems(items)}
            </Menu>
        </Sider>
    );
};

const MyHeader = ({ primary, togglePrimaryColor }: { primary: string, togglePrimaryColor: (color: string) => void }) => (
    <Header style={{ width: 'auto', height: '6vh', padding: 0, backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)", }}>
        <Row>
            <Col span={12}>
                <Flex justify="flex-start" align="flex-start" gap="small">
                    <ColorPicker value={primary} onChangeComplete={togglePrimaryColor} style={{ margin: '1vh', border: 'none', background: "inherit", }} />
                    <Title style={{ fontSize: "1.5vw", fontFamily: "Silkscreen", marginTop: '1vh', color: '#fff' }}>
                        <Link to="/" style={{ color: 'inherit' }}>Ecolens System</Link>
                    </Title>
                </Flex>
            </Col>
            <Col span={6} offset={6}>
                <Flex justify="flex-end" align='center' style={{ margin: '1vh 1vw', overflow: 'hidden', }}>

                    <Tooltip placement='bottom' title={<span>Contact us!</span>}>
                        <Button href='https://github.com/LeonardoSya' size="large" style={{ boxShadow: 'none', border: 'none', background: 'inherit', marginTop: '0vh' }} icon={<WechatFilled />} />
                    </Tooltip>
                    <Tooltip placement='bottom' title={<span>GitHub</span>}>
                        <Button href='https://github.com/LeonardoSya/Ecolens-System' target='_blank' size="large" style={{ boxShadow: 'none', border: 'none', background: 'inherit' }} icon={<GithubOutlined />} />
                    </Tooltip>
                    <Tooltip placement='bottom' title={<span>Docs</span>}>
                        <Button href='https://github.com/LeonardoSya/Ecolens-System/blob/main/README.md' target='_blank' size='large' style={{ boxShadow: 'none', border: 'none', background: 'inherit' }} icon={<FileFilled />} />
                    </Tooltip>
                    <Tooltip placement='bottomRight' title={<span>Developer Log</span>}>
                        <Button href='https://github.com/LeonardoSya/React-studynote/pulse/monthly' target='_blank' size='large' style={{ boxShadow: 'none', border: 'none', background: 'inherit' }} icon={<CodeFilled />} />
                    </Tooltip>
                </Flex>
            </Col>
        </Row>
    </Header>
);

const MySearchModule = ({ collapsed, toggleCollapsed }) => {

    return (
        <Flex justify='flex-start' align='center' gap="large" style={{ background: '#f5f5f5', height: '10vh' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: '16px', width: 64, height: 64, marginTop: '0' }}
            />

            <div className="search-input-container">
                <input className="search-input" name="text" type="text" />
                <label className="search-label" htmlFor="input">Enter Your Query</label>
                <div className="search-topline"></div>
                <div className="search-underline"></div>
            </div>

        </Flex>
    );
};

export const MyMap = () => {

    return (
        <Content>
            {/* Route用于将应用的位置映射到不同的React组件 */}
            {/* Route 接受 path(页面URL应导航到的路径，类似NavLink的to), element(页面导航到该路由时加载的元素) */}
            <Routes>
                <Route path='/rsimagery' element={<RSImagery />} />
                <Route path='/xylophilus' element={<Xylophilus />} />
                <Route path='/swipe' element={<Swipe />} />
                <Route path='/ndvitemp' element={<QuarterlyChart />} />
                <Route path='/overview' element={<Overview />} />
                <Route path='/introduction' element={<Introduction />} />
                <Route path='/' element={<Navigate replace to="/introduction" />} />
            </Routes>
        </Content>
    );
};

export default Services;