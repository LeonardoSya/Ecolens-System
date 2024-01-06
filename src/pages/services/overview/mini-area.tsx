import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Chart } from '@antv/g2';
import './index.css';

interface MiniAreaProps {
    title: string;
    description: string;
    cardStyle?: React.CSSProperties;
}

const data = [
    0.55, 0.592, 0.572, 0.593, 0.612, 0.526, 0.549, 0.573, 0.56, 0.591, 0.527, 0.593, 0.545, 0.587, 0.59, 0.572, 0.632, 0.635, 0.637, 0.578, 0.615
];

const MiniArea: React.FC<MiniAreaProps> = ({ title, description }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        
        setTimeout(() => {
            fetchData();
        }, 500);

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
                    .encode('x', (_: any, idx: any) => idx)
                    .encode('y', (d: any) => d)
                    .encode('shape', 'smooth')
                    .scale('y', { zero: true, domain: [0.45, 0.65] })
                    .style('fill', 'linear-gradient(-90deg, white 0%, #10239e 50%)')
                    .style('fillOpacity', 0.7)
                    .animate('enter', { type: 'fadeIn' })
                    .axis(false)

                chart.interaction('tooltip', {
                    // @ts-ignore
                    render: (e: any, { title, items }: any) => items[0].value,
                })

                chart.render();

            } catch (error) {
                console.error('Error fetching data "MiniArea" :', error);
            }
        };

    }, []);

    return (
        <Card
            className="card"
            style={{
                padding: 0,
                margin: 0,
            }}
            cover={
                <div id='miniarea-container' ref={chartRef} style={{ padding: 0, margin: 0, height: "149px" }}></div>
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
                className='text'
            />
        </Card>
    )
}


export default MiniArea;