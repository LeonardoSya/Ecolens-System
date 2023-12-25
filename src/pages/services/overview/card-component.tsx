import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import './index.css';

interface LittleCardProps {
    title: string;
    description: string;
    coverImage: string;
    avatarImage: string;
    cardStyle?: React.CSSProperties;  // 卡片样式(可选)
}

const CardComponent: React.FC<LittleCardProps> = ({ title, description, coverImage, avatarImage }) => {

    return (
        <Card
            className="card"
            style={{
                padding:0,
                margin:0,
            }}
            cover={
                <img
                    alt='example'
                    src={coverImage}
                />
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Card.Meta
                style={{
                    padding: 0,
                    margin: 0,
                }}
                title={title}
                description={description}
                avatar={<Avatar src={avatarImage} />}
            />
        </Card>
    );
};

export default CardComponent;


