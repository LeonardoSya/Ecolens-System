import { FloatButton, message, notification } from 'antd';
import React, { useContext } from 'react';
import { EditFilled, SyncOutlined, FileSearchOutlined, ExpandOutlined, } from '@ant-design/icons';
import { GuideContext } from '../models/tour-context';

interface floatbuttonProps {
    toggleFullScreen: () => void;
    infoDescription: string;
    titleDescription: string;
}

const Floatbutton: React.FC<floatbuttonProps> = React.memo(({ toggleFullScreen, infoDescription, titleDescription }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [api, contextHolderApi] = notification.useNotification();
    const { refs } = useContext(GuideContext);

    const info = () => {
        messageApi.info('You have exited full-screen mode.');
    };

    const openNotification = () => {
        api.open({
            message: titleDescription,
            description: infoDescription,
            icon: <FileSearchOutlined />,
            style: {},
        })
    }

    return (
        <>
            {contextHolder}
            {contextHolderApi}
            <FloatButton.Group shape='circle' style={{ right: "2rem" }}>
                <FloatButton ref={refs.ref2} icon={<FileSearchOutlined />} onClick={openNotification} tooltip={<div>地图说明</div>} />
                <FloatButton ref={refs.ref3} icon={<ExpandOutlined />} onClick={() => { toggleFullScreen(); info(); }} tooltip={<div>全屏</div>} />
                <FloatButton ref={refs.ref4} icon={<EditFilled />} tooltip={<div>在 Ecolens 中编辑</div>} />
                <a style={{ position: 'absolute' }} target='_blank' rel="noopener noreferrer" href='https://github.com/LeonardoSya/Ecolens-System/blob/main/README.md'>
                    <FloatButton ref={refs.ref5} tooltip={<div>业务文档</div>} />
                </a>
                <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} tooltip={<div>刷新页面</div>} />
                {/* 虽然不知道这边为什么要加两次 不然不显示 ... */}
                <FloatButton icon={<SyncOutlined />} onClick={() => window.location.reload()} tooltip={<div>刷新页面</div>} /> 
                <FloatButton.BackTop visibilityHeight={70} tooltip={<div>返回顶部</div>} />
            </FloatButton.Group>
        </>

    );
});

export default Floatbutton;