import React, { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/plots';
import useSafeState from '../../hooks/useSafeState';

const ScatterPlot: React.FC<{}> = () => {
    const [data, setData] = useSafeState([]);

    useEffect(() => {
        asyncFetch();
    }, [])

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log('Fetch data failed', error));
    };

    const config = {
        data,
        xField: 'x',
        yField: 'y',
        colorField: 'gender',
        size: 5,
        shape: 'circle',
        pointStyle: {
            fillOpacity: 1,
        },
        brush: {
            enable: true,
            mask: {
                style: {
                    fill: 'rgba(255,0,0,0.15)'
                }
            }
        }
    };

    return <Scatter {...config} />
};


export default ScatterPlot;