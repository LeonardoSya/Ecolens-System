import { useEffect } from 'react';
import { Line } from '@ant-design/plots';
import useSafeState from '../../hooks/useSafeState';

const AnimatedLineChart = () => {
    const [data, setData] = useSafeState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {

        try {
            const response = await fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error('Fetch data failed', error);
        }
    };

    const config = {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        xAxis: {
            label: {
                autoRotate: true,
            },
            tickInterval:3,
        },
        yAxis: {
            label: {
                formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
            },
        },
        legend: {
            position: 'top',
        },
        smooth: true,    // @TODO 后续会换一种动画方式
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
    };

    return (
        <>
            {/* 查看日志 */}
            {console.log('Config:', config)}  
            <Line {...config} />;
        </>

    );
}

export default AnimatedLineChart;