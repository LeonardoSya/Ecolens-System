import React, { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, lazy, Suspense } from 'react';
import { Link, To } from 'react-router-dom';
import { Col, Row, ColorPicker, ConfigProvider, Flex, Button, Layout, Menu, Typography, Tooltip } from 'antd';
import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, SlidersOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, GithubOutlined, WechatFilled, CodeFilled, FileFilled } from '@ant-design/icons';
import { useSafeState } from '../../hooks/hooks';
import { JSX } from 'react/jsx-runtime';
import HomepageSkeleton from '../../components/homepage-skeleton';
import './search-input.css';

const { Header, Footer, Sider } = Layout;
const { Title } = Typography;
const MapRoutes = lazy(() => import('./Map'));

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
    getItem('区域概况', '1', <PieChartOutlined style={{ fontSize: '1.8rem' }} />, "/services/swipe"),
    getItem('遥感影像', '2', <AreaChartOutlined style={{ fontSize: '1.8rem' }} />, "/services/rsimagery"),
    getItem('虫害监测', '3', <DotChartOutlined style={{ fontSize: '1.8rem' }} />, "/services/xylophilus"),
    getItem('生态状况', '4', <BarChartOutlined style={{ fontSize: '1.8rem' }} />, "/services/ndvitemp"),
    getItem('产品文档', '5', <SlidersOutlined style={{ fontSize: '1.8rem' }} />, "/services/introduction"),
];

const MySider = ({ collapsed }: { collapsed: boolean }) => {
    const renderMenuItems = (menuItems: any[]) => {
        return menuItems.map((item: { key: Key | null | undefined; icon: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; path: To; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ borderRadius: '0.8rem', fontSize: "1.2rem", margin: "0.2rem 0.5rem 0.1rem 0.25rem", height: '4rem', lineHeight: '4rem' }}>
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
                    {/* @ts-ignore */}
                    <ColorPicker value={primary} onChangeComplete={togglePrimaryColor} style={{ margin: '1vh', border: 'none', background: "inherit", }} />
                    <Title style={{ fontSize: "1.5vw", marginTop: '1vh', color: '#fff' }}>
                        <Link to="/" style={{ color: 'inherit' }}>Ecolens 生态监测系统</Link>
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

const MySearchModule = ({ collapsed, toggleCollapsed }: { collapsed: boolean, toggleCollapsed: () => void }) => {

    return (
        <Flex justify='flex-start' align='center' gap="large" style={{ background: '#f5f5f5', height: '10vh' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: '16px', width: 64, height: 64, marginTop: '0' }}
            />

            <div className="search-input-container">
                <input className="search-input" name="text" type="text" placeholder='虫害监测' />
                <label className="search-label" htmlFor="input">Enter Your Query</label>
                <div className="search-topline"></div>
                <div className="search-underline"></div>
            </div>
        </Flex>
    );
};

interface MyMapProps {
    style?: React.CSSProperties;
}

export const MyMap: React.FC<MyMapProps> = () => (
    <Suspense fallback={<HomepageSkeleton />}>
        <MapRoutes />
    </Suspense>
);

export default Services;