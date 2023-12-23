import React, { useEffect, useRef } from 'react';
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Chart } from '@antv/g2';
import './index.css';

interface PathlnProps {
    title: string;
    description: string;
    avatarImage: string;
    cardStyle?: React.CSSProperties;
}

const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
];

const MiniArea: React.FC<PathlnProps> = ({ title, description, avatarImage }) => {
    const chartRef = useRef(null);

    useEffect(() => {

        const fetchData = () => {
            try {
                const chart = new Chart({
                    container: chartRef.current!,
                    autoFit: true,
                });

                chart
                    .data(data);

                chart
                    .area()
                    .encode('x', (_, idx) => idx)
                    .encode('y', (d) => d)
                    .encode('shape', 'smooth')
                    .scale('y', { zero: true })
                    .style('fill', 'linear-gradient(-90deg, white 0%, #4e4268 50%)')
                    .style('fillOpacity', 0.6)
                    .animate('enter', { type: 'fadeIn' })
                    .axis(false);

                chart.interaction('tooltip', {
                    render: (e, { title, items }) => items[0].value,
                })

                chart.render();

            } catch (error) {
                console.error('Error fetching data "MiniArea" :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card
            className="card"
            cover={
                <div id='miniarea-container' ref={chartRef} className="card" style={{height:"5vw"}}></div>
            }
            actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Card.Meta
                title={title}
                description={description}
                avatar={<Avatar src={avatarImage} />}
            />
        </Card>
    )
}


export default MiniArea;