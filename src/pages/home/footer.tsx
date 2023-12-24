import React from 'react';
import { Divider } from "antd";
import { Footer } from "antd/es/layout/layout";
import { GithubOutlined } from '@ant-design/icons';

const HomepageFooter = () => (
    <Footer
        style={{
            height: "8em",
            background: "rgba(0,0,0,.8)"
        }}
    >
        <Divider style={{ color: '#bfbfbf', fontWeight: '400', fontSize: '0.8vw' }}>
            <GithubOutlined style={{ color: "#8c8c8c", margin: '0 1vw', fontSize: '1vw' }} />
            © 2023 GitHub, Inc. Ecolens System Created by Zhangyiyang
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Terms</a>
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Security</a>
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Privacy</a>
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Docs</a>
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Contact</a>
            <a href="https://github.com/LeonardoSya" target='_blank' style={{ margin: "0.5vw", color: '#bfbfbf', fontWeight: '200' }}>Cookies</a>
        </Divider>
    </Footer>
);

export default HomepageFooter;