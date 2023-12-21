import React, { useState } from 'react';
import { Route, Link, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { FloatButton, Col, Row, ColorPicker, Divider, ConfigProvider, App, Space, Select, Flex, Button, Layout, Menu, theme, Typography, Dropdown, Tooltip, Switch } from 'antd';
import { AreaChartOutlined, BarChartOutlined, EditFilled, DotChartOutlined, LineChartOutlined, RadarChartOutlined, SlidersOutlined, FundOutlined, ZoomInOutlined, ZoomOutOutlined, SyncOutlined, MenuFoldOutlined, MenuUnfoldOutlined, DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, GithubOutlined, WechatFilled, CodeFilled, FileFilled } from '@ant-design/icons';

import { Introduction, Overview, Page1, QuarterlyChart, Page3, Page4, Page5 } from '../Components/Routers/services-routers';
import { useSafeState } from '../Components/hooks/hooks';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;


const Services = () => {
    const [collapsed, setCollapsed] = useSafeState(false);
    const [primary, setPrimary] = useSafeState('#262626')
    // const { token: { colorBgContainer }, } = theme.useToken();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const togglePrimaryColor = (color) => {
        setPrimary(color.toHexString())
    }

    function forceCollapsed() {
        if (collapsed === false) {
            setCollapsed(true);
        }
    }


    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token 影响范围大
                    colorPrimary: primary,
                    // // 派生变量，影响范围小
                    // // colorBgContainer:''
                }
            }}
        >
            <MyFloatButton />

            <Layout style={{ minHeight: '100vh', width: '103.2%' }}>
                {/* Sider */}
                <MySider collapsed={collapsed} />

                <Layout onClick={forceCollapsed}>
                    {/* Header */}
                    <MyHeader collapsed={collapsed} togglePrimaryColor={togglePrimaryColor} />

                    {/* Search module */}
                    <MySearchModule collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

                    {/* Router */}
                    <MyMap style={{ width: '100vw' }} />
                    {/* Footer */}
                    <Footer style={{ textAlign: 'center', background: 'rgba(0,0,0,.8)', color: '#bfbfbf' }}>
                        Ecolens System ©2023 Created by Zhangyiyang
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>

    );
}

function getItem(label, key, icon, path) {
    return {
        label, key, icon, path
    };
}

const items = [
    getItem('Overview', '1', <PieChartOutlined style={{ fontSize: 18 }} />, "/services/overview"),
    getItem('Page 1', '2', <AreaChartOutlined style={{ fontSize: 20 }} />, "/services/page1"),
    getItem('NDVI&Tempe', '3', <BarChartOutlined style={{ fontSize: 20 }} />, "/services/quarterlychart"),
    getItem('Page 3', '4', <DotChartOutlined style={{ fontSize: 20 }} />, "/services/page3"),
    getItem('Page 4', '5', <LineChartOutlined style={{ fontSize: 20 }} />, "/services/page4"),
    getItem('Page 5', '6', <RadarChartOutlined style={{ fontSize: 20 }} />, "/services/page5"),
    getItem('Introduction', '7', <SlidersOutlined style={{ fontSize: 20 }} />, "/services/introduction"),

];

const MySider = ({ collapsed }) => {
    const renderMenuItems = (menuItems) => {
        return menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
        ));
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: "#2d5676" }}>
            <div className='demo-log-vertical' />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 60%)" }} >
                {renderMenuItems(items)}
            </Menu>
        </Sider>
    );
};


const MyHeader = ({ primary, togglePrimaryColor }) => (
    <Header style={{ width: '100%', height: '6vh', padding: 0, backgroundImage: " linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)", }}>
        <Row>
            <Col span={12}>
                <Flex justify="flex-start" align="flex-start" gap="small">
                    <ColorPicker value={primary} onChangeComplete={togglePrimaryColor} style={{ margin: '1vh', border: 'none', background: "inherit", }} />
                    <Title style={{ fontSize: "1.5vw", fontFamily: "Silkscreen", marginTop: '1vh', color: '#fff' }}>
                        <Link to="https://buzzard-equipped-heavily.ngrok-free.app/" style={{ color: 'inherit' }}>Ecolens System</Link>
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
                        <Button href='#' target='_blank' size='large' style={{ boxShadow: 'none', border: 'none', background: 'inherit' }} icon={<FileFilled />} />
                    </Tooltip>
                    <Tooltip placement='bottomRight' title={<span>Developer Log</span>}>
                        <Button href='https://github.com/LeonardoSya/React-studynote/pulse/monthly' target='_blank' size='large' style={{ boxShadow: 'none', border: 'none', background: 'inherit' }} icon={<CodeFilled />} />
                    </Tooltip>
                </Flex>
            </Col>
        </Row>
    </Header>
);

const selectOptions = [
    {
        value: '1',
        label: 'Services',
        path: "/",
        page: 'Services',
    },
    {
        value: '2',
        label: 'Page 1',
        path: '/page1',
        page: 'Page1',
    },
    {
        value: '3',
        label: 'Page 2',
        path: '/page2',
        page: 'Page2',
    },
    {
        value: '4',
        label: 'Page 3',
        path: '/page3',
        page: 'Page3',
    },
    {
        value: '5',
        label: 'Page 4',
        path: '/page4',
        page: 'Page4',
    },
    {
        value: '6',
        label: 'Page 5',
        path: '/page5',
        page: 'Page5',
    },
]

const MySearchModule = ({ collapsed, toggleCollapsed }) => {
    const navigate = useNavigate();

    const handleSelectChange = (value, option) => {
        console.log('yes');

        navigate(option.link);
    }

    return (
        <Flex justify='flex-start' align='center' gap="large" style={{ background: '#f5f5f5', height: '10vh' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: '16px', width: 64, height: 64, marginTop: '0' }}
            />

            <Select
                showSearch
                style={{
                    width: 200,
                }}
                placeholder="Search to Select"
                defaultActiveFirstOption
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={selectOptions.map((option) => ({
                    key: option.value,
                    label: option.label,
                    link: option.path,
                }))}
                onSelect={handleSelectChange}  // ?? 切换路由失败了，再研究一下
            />
        </Flex>
    );
};

const MyFloatButton = () => {  // ?? 通过 Button setZoom 失败了，再研究一下
    return (
        <FloatButton.Group
            shape='circle'
            style={{ right: 24 }}
        >
            <FloatButton icon={<EditFilled />} />
            <FloatButton />
            <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} />
            <FloatButton.BackTop visibilityHeight={70} />
        </FloatButton.Group>
    );
}

const MyMap = () => (
    <Content>

        {/* Route用于将应用的位置映射到不同的React组件 */}
        {/* Route 接受 path(页面URL应导航到的路径，类似NavLink的to), element(页面导航到该路由时加载的元素) */}
        <Routes>
            <Route path='/overview' element={<Overview />} />
            <Route path='/page1' element={<Page1 />} />
            <Route path='/quarterlychart' element={<QuarterlyChart />} />
            <Route path='/page3' element={<Page3 />} />
            <Route path='/page4' element={<Page4 />} />
            <Route path='/page5' element={<Page5 />} />
            <Route path='/introduction' element={<Introduction />} />
            <Route path='*' element={<Navigate to="/services/overview" />} />
        </Routes>
    </Content>
);

export default Services;