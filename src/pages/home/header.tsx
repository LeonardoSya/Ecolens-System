import { Link } from 'react-router-dom';
import { Col, Row, } from 'antd';
import { GithubOutlined, InstagramFilled } from '@ant-design/icons';

const HomepageHeader = () => (
    <Row
        align="middle"
        justify="space-around"
        style={{
            background: "rgba(8,8,8,.88)",
            height: '4.5vw',
            fontWeight: '400',
            color: "#a78bfa"
        }}
    >
        <Col span={2}></Col>
        <Col span={1}>
            <InstagramFilled style={{ fontSize: "3vw" }} />
        </Col>
        <Col span={8}>
            <span style={{ fontSize: "2vw" }}><Link to="/" style={{ color: 'inherit' }}>Ecolens System <i style={{ fontSize: '1.6vw' }}>生态监测系统</i></Link></span>
        </Col>
        <Col span={4}></Col>
        <Col span={8}
            style={{ display: 'flex', textAlign: "center", fontSize: "1.2vw", letterSpacing: '0.1rem'}}>
            <Link to="/services/introduction" target='_blank' style={{ margin: "auto 1vw", color: 'inherit' }}>地图服务</Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System/blob/main/README.md" target='_blank' style={{ margin: "auto 1rem", color: 'inherit' }}>产品文档</Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System" target='_blank' style={{ margin: "auto 1vw", color: 'inherit' }}>在GitHub上查看 </Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System" target='_blank'><GithubOutlined style={{ fontSize: '2vw', color:'#a78bfa' }} /></Link>
        </Col>
        <Col span={1}></Col>
    </Row>

);

export default HomepageHeader;