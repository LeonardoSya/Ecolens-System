import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
// import Galaxy from '../Galaxy';
import axios from 'axios';
import { useSafeState } from '../hooks/hooks';


const { Content } = Layout;
const { Title } = Typography;

const Page3 = () => {
    const [data, setData] = useSafeState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('../assets/银河.png', {
                    responseType: 'arraybuffer',  // 处理二进制数据
                });
                setData(response.data);
            } catch (error) {
                console.error('获取 APNG 数据出错', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Content
            style={{
                padding: 24,
                minHeight: '80vh',
                backgroundImage: '../../assets/银河.png'
            }}>
            <Title level={2}>This page is Page 3 :)</Title>
        </Content>
    );
}

export default Page3;