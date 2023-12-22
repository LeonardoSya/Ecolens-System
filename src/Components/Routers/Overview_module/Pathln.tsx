import React, { useEffect, useRef } from 'react';
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Chart } from '@antv/g2';
import styles from '../../../style/Overview.module.css';
interface PathlnProps {
    title: string;
    description: string;
    avatarImage: string;
    cardStyle?: React.CSSProperties;
}

const Pathln: React.FC<PathlnProps> = ({ title, description, avatarImage }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        interface Data {
            date: string;
            close: number;
        }

        const fetchData = () => {
            try {
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

            } catch (error) {
                console.error('Error fetching data "Pathln" :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card
            className={styles.cards}
            cover={
                <div id='pathln-container' ref={chartRef} className={styles.card} style={{ height: "8vw" }}></div>
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


export default Pathln;