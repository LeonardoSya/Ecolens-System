import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

const Area = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://assets.antv.antgroup.com/g2/unemployment-by-industry.json');
                const data = await response.json();

                const chartInstance = new Chart({
                    container: chartContainerRef.current,
                    autoFit: true,
                });
                chartRef.current = chartInstance;

                // 数据请求和图表配置
                chartInstance.data({
                    type: 'fetch',
                    value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
                });

                chartInstance
                    .area()
                    .transform([
                        { type: 'stackY' }, // Try to remove this line.
                    ])
                    .encode('x', (d) => new Date(d.date))
                    .encode('y', 'unemployed')
                    .encode('color', 'industry')
                    .encode('shape', 'smooth');

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Area;
