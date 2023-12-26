import { FloatButton, message } from 'antd';
import React from 'react';
import { EditFilled, SyncOutlined, FileSearchOutlined, ExpandOutlined, } from '@ant-design/icons';

interface floatbuttonProps {
    toggleFullScreen: () => void;
}

const Floatbutton: React.FC<floatbuttonProps> = React.memo(({ toggleFullScreen }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info('You have exited full-screen mode.');
    };
    return (
        <>
            {contextHolder}
            <FloatButton.Group shape='circle' style={{ right: "2rem" }}>
                <FloatButton icon={<FileSearchOutlined />} tooltip={<div>地图说明</div>} />
                <FloatButton icon={<ExpandOutlined />} onClick={() => {toggleFullScreen();info();}} tooltip={<div>全屏</div>} />
                <FloatButton icon={<EditFilled />} tooltip={<div>在 Ecolens 中编辑</div>} />
                <FloatButton tooltip={<div>业务文档</div>} />
                <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} tooltip={<div>刷新页面</div>} />
                <FloatButton.BackTop visibilityHeight={70} tooltip={<div>返回顶部</div>} />
            </FloatButton.Group>
        </>

    );
});

export default Floatbutton;