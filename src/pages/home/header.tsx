/*
 * @Author: LeonardoSya 2246866774@qq.com
 * @Date: 2023-12-08 13:02:28
 * @LastEditors: LeonardoSya 2246866774@qq.com
 * @LastEditTime: 2023-12-31 13:12:25
 * @FilePath: \React\05_antd\02_布局\vite-project\src\pages\home\header.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
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
            <InstagramFilled style={{ fontSize: "2.8vw" }} />
        </Col>
        <Col span={8}>
            <span style={{ fontSize: "2vw", fontFamily: "Silkscreen" }}><Link to="/" style={{ color: 'inherit' }}>Ecolens System</Link></span>
        </Col>
        <Col span={4}></Col>
        <Col span={8}
            style={{ textAlign: "center", fontSize: "1.2vw" }}>
            <Link to="/services/rsimagery" style={{ margin: "auto 1vw", fontFamily: "Poppins", color: 'inherit' }}>Services</Link>
            <Link to="#" style={{ margin: "auto 1vw", fontFamily: "Poppins", color: 'inherit' }}>Documents</Link>
            <Link to="https://github.com/LeonardoSya/Ecolens-System" style={{ margin: "auto 1vw", fontFamily: "Poppins", color: 'inherit' }}>Star us on GitHub <GithubOutlined style={{ fontSize: '1rem', marginLeft: '0.3rem' }} /></Link>
        </Col>
        <Col span={1}></Col>
    </Row>

);

export default HomepageHeader;