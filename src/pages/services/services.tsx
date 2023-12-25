import { BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate, To } from 'react-router-dom';
import { Col, Row, ColorPicker, ConfigProvider, Flex, Button, Layout, Menu, theme, Typography, Tooltip } from 'antd';
import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, LineChartOutlined, RadarChartOutlined, SlidersOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, GithubOutlined, WechatFilled, CodeFilled, FileFilled } from '@ant-design/icons';
import { Introduction, Overview, Xylophilus, QuarterlyChart, Page3, Page4, Page5, RSImagery } from './services-routers';
import { useSafeState } from '../../hooks/hooks';
import './search-input.css';
import { SetStateAction } from 'react';
import { JSX } from 'react/jsx-runtime';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Services = () => {
    const [primary, setPrimary] = useSafeState('#262626');
    // const { collapsed, setCollapsed, forceCollapsed, toggleCollapsed } = useContext(ChartContext);
    const [collapsed, setCollapsed] = useSafeState(false);
    // const { token: { colorBgContainer }, } = theme.useToken();

    const togglePrimaryColor = (color: { toHexString: () => SetStateAction<string>; }) => {
        setPrimary(color.toHexString())
    }

    const toggleCollapsed = () => {
        collapsed ? setCollapsed(false) : setCollapsed(true);
    }


    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token 影响范围大
                    colorPrimary: primary,
                    // // 派生变量,影响范围小
                    // // colorBgContainer:''
                }
            }}
        >
            <Layout>
                {/* Sider */}
                <MySider collapsed={collapsed} />

                <Layout>
                    {/* Header */}
                    <MyHeader primary={primary} togglePrimaryColor={togglePrimaryColor} />

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


function getItem(label: string, key: string, icon: JSX.Element, path: string) {
    return {
        label, key, icon, path
    };
}

const items = [
    getItem('Overview', '1', <PieChartOutlined style={{ fontSize: 18 }} />, "/services/overview"),
    getItem('RS Imagery', '2', <AreaChartOutlined style={{ fontSize: 20 }} />, "/services/rsimagery"),
    getItem('NDVI&Tempe', '3', <BarChartOutlined style={{ fontSize: 20 }} />, "/services/ndvitemp"),
    getItem('Xylophilus', '4', <DotChartOutlined style={{ fontSize: 20 }} />, "/services/xylophilus"),
    getItem('Page 4', '5', <LineChartOutlined style={{ fontSize: 20 }} />, "/services/page4"),
    getItem('Page 5', '6', <RadarChartOutlined style={{ fontSize: 20 }} />, "/services/page5"),
    getItem('Introduction', '7', <SlidersOutlined style={{ fontSize: 20 }} />, "/services/introduction"),

];

const MySider = ({ collapsed }: { collapsed: boolean }) => {
    const renderMenuItems = (menuItems: any[]) => {
        return menuItems.map((item: { key: Key | null | undefined; icon: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; path: To; label: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <Menu.Item key={item.key} icon={item.icon} style={{ fontSize: "1.1rem" }}>
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


// const selectOptions = [
//     {
//         value: '1',
//         label: 'Services',
//         path: "/",
//         page: 'Services',
//     },
//     {
//         value: '2',
//         label: 'Page 1',
//         path: '/page1',
//         page: 'Page1',
//     },
//     {
//         value: '3',
//         label: 'Page 2',
//         path: '/page2',
//         page: 'Page2',
//     },
//     {
//         value: '4',
//         label: 'Page 3',
//         path: '/page3',
//         page: 'Page3',
//     },
//     {
//         value: '5',
//         label: 'Page 4',
//         path: '/page4',
//         page: 'Page4',
//     },
//     {
//         value: '6',
//         label: 'Page 5',
//         path: '/page5',
//         page: 'Page5',
//     },
// ]

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
                <Route path='/overview' element={<Overview />} />
                <Route path='/rsimagery' element={<RSImagery />} />
                <Route path='/ndvitemp' element={<QuarterlyChart />} />
                <Route path='/xylophilus' element={<Xylophilus />} />
                <Route path='/page4' element={<Page4 />} />
                <Route path='/page5' element={<Page5 />} />
                <Route path='/introduction' element={<Introduction />} />
                <Route path='/' element={<Navigate replace to="/overview" />} />
            </Routes>
        </Content>
    );
};

export default Services;