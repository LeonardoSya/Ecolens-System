import React, { useState, useEffect } from 'react';
import { HexbinMap } from '@ant-design/maps';

// 定义接口描述json数据结构
interface DataItem {
    lng: number;
    lat: number;
    v: number;
}

const Honeycomb: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('/honeycomb-data.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);  // 直接将解析后的json数据
            })
            .catch((error) => {
                console.log('honeycomb fetch data failed', error);
            });
    };

    if (!data.length) {
        return null;
    }
    const config = {
        map: {
            type: 'amap',
            style: 'dark',
            pitch: 43,
            center: [120.13383079335335, 29.9],
            zoom: 8.2,
        },
        source: {
            data: data,
            parser: {
                type: 'csv',
                x: 'lng',
                y: 'lat',
            },
            aggregation: {
                field: 'v',
                radius: 2500,
                method: 'sum',
            },
        },
        shape: 'hexagonColumn',
        size: {
            field: 'sum',
            value: ({ sum }: { sum: number }) => {
                return sum * 200;
            },
        },
        color: {
            field: 'sum',
            value: [
                '#094D4A',
                '#146968',
                '#1D7F7E',
                '#289899',
                '#34B6B7',
                '#4AC5AF',
                '#5FD3A6',
                '#7BE39E',
                '#A1EDB8',
                '#C3F9CC',
                '#DEFAC0',
                '#ECFFB1',
            ],
        },
        style: {
            coverage: 0.8,
            angle: 0,
            opacity: 1.0,
        },
    };

    // @ts-ignore
    return <HexbinMap {...config} />;
}

export default Honeycomb;


// !! 存在key等问题