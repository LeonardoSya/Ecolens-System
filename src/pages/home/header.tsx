import { Link } from 'react-router-dom';
import { Col, Row, } from 'antd';
import { GithubOutlined, InstagramFilled } from '@ant-design/icons';

const HomepageHeader = () => (
    <Row
        align="middle"
        justify="space-around"
        style={{
            background: "rgba(8,8,8,.88)",
            height: '6em',
            fontWeight: '400',
            color: "#a78bfa"
        }}
    >
        <Col span={2}></Col>
        <Col span={1}>
            <InstagramFilled style={{ fontSize: "3rem" }} />
        </Col>
        <Col span={8}>
            <span style={{ fontSize: "2rem" }}><Link to="/" style={{ color: 'inherit' }}>Ecolens System <i style={{fontSize:'1.6rem'}}>生态监测系统</i></Link></span>
        </Col>
        <Col span={4}></Col>
        <Col span={8}
            style={{ textAlign: "center", fontSize: "1.2rem", letterSpacing:'0.12rem' }}>
            <Link to="/services/introduction" target='_blank' style={{ margin: "auto 1vw", color: 'inherit' }}>地图服务</Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System/blob/main/README.md" target='_blank' style={{ margin: "auto 1vw", color: 'inherit' }}>产品文档</Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System" target='_blank' style={{ margin: "auto 1vw",  color: 'inherit' }}>在GitHub上查看 <GithubOutlined style={{ fontSize: '2rem', marginLeft: '0.3rem' }} /></Link>
        </Col>
        <Col span={1}></Col>
    </Row>

);

export default HomepageHeader;