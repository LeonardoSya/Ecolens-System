import { Col, Row, } from 'antd';
import { InstagramFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GithubOutlined } from '@ant-design/icons';

const HomePage_Header = () => {

    return (

        <Row
            align="middle"
            justify="space-around"
            style={{
                background: "rgba(8,8,8,.88)",
                height: '6vh',
                fontWeight: '400',
                color: "#a78bfa"
            }}
        >
            <Col span={2}></Col>
            <Col span={1}>
                <InstagramFilled style={{ fontSize: "2vw" }} />
            </Col>
            <Col span={8}>
                <span style={{ fontSize: "1.6vw", fontFamily: "Silkscreen" }}><Link to="/" style={{ color: 'inherit' }}>Ecolens System</Link></span>
            </Col>
            <Col span={4}></Col>
            <Col span={8}
                style={{ textAlign: "center", fontSize: "0.8vw" }}>
                <Link to="/services/homepage" style={{ margin: "auto 1vw", fontFamily: "Poppins",color: 'inherit' }}>Services</Link>
                <Link to="#" style={{ margin: "auto 1vw", fontFamily: "Poppins", color: 'inherit' }}>Documents</Link>
                <Link to="https://github.com/LeonardoSya/React-studynote" style={{ margin: "auto 1vw", fontFamily: "Poppins", color: 'inherit' }}>Star us on GitHub <GithubOutlined style={{fontSize:'1rem', marginLeft:'0.3rem'}} /></Link>
            </Col>
            <Col span={1}></Col>
        </Row>

    )

}

export default HomePage_Header;