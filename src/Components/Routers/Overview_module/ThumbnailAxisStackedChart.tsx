import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';
import useSafeState from '../../hooks/useSafeState';

const ThumbnailAxisStackedChart = () => {
    const [data, setData] = useSafeState([]);

    useEffect(() => {
        asyncFetch();
    }, [])

    const asyncFetch = async () => {

        // fetch('../../../assets/data/ThumbnailAxisStacked_data.json')
        //     .then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => {
        //         console.log('fetch data failed', error);
        //     });

        try {
            const response = await fetch('../../../assets/data/ThumbnailAxisStacked_data.json');   //* fetch 会返回一个Promise对象, 当该Promise被解析时，会得到一个Response对象
            const json = await response.json();   //* 使用response.json()解析Response对象， response.json()也会返回一个Promise对象，解析得到JSON数据
            setData(json);   //* 解析得到的JSON数据通过setData 设置到组件的状态中
        } catch (error) {
            console.error('Fetch data failed', error);
        }
    };

    const config = {
        data,
        xField: 'data',
        yField: 'value',
        seriesField: 'country',
        slider: {
            start: 0.1,
            end: 0.9,
        },
    };

    return <Area {...config} />

};


export default ThumbnailAxisStackedChart;