import React, { useEffect, useRef, useContext } from 'react';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Chart } from '@antv/g2';
import { ChartContext } from '../../../models/chart-context';
import './index.css';

interface PathlnProps {
    title: string;
    description: string;
    cardStyle?: React.CSSProperties;
}
const Pathln: React.FC<PathlnProps> = ({ title, description }) => {
    const chartRef = useRef(null);
    const cardRef = useRef(null);
    const { collapsed } = useContext(ChartContext);

    useEffect(() => {

        setTimeout(() => {
            const chart = new Chart({
                container: chartRef.current!,
                autoFit: true,
            })

            chart
                .line()
                .data({
                    type: 'fetch',
                    value: 'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
                })
                .encode('x', 'date')
                .encode('y', 'close')
                .animate('enter', { type: 'pathIn', duration: 2000 })
                .axis('x', { line: null, label: null })
                .axis('y', { line: null, label: null });

            chart.render();
        }, 100);

    }, [collapsed]);

    return (
        <Card
            ref={cardRef}
            className="card"
            style={{
                padding: 0,
                margin: 0,
                height: '8vw',
                background: 'rgb(245,245,245)'
            }}
            cover={
                <div id='pathln-container' ref={chartRef} style={{ padding: 0, margin: 0, height: "149px" }}></div>
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
                className='text'
                title={title}
                description={description}
            />
        </Card>
    )
}


export default Pathln;