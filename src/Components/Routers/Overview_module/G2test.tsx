import React from 'react';
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

const G2test = () => {
    const container = useRef(null);
    const chart = useRef(null);

    useEffect(() => {
        if (!chart.current) {
            chart.current = renderBarChart(container.current);
        }

        return () => {
            if (chart.current) {
                chart.current.destroy();
                chart.current = null;
                console.log('Successfully unmount chart!')
            }
        };
    }, []);

    //* 渲染条形图
    function renderBarChart(container) {
        const chart = new Chart({
            container,
            width: 250,
            height: 250,
        });

        // 准备数据
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];

        //* 声明可视化
        chart
            .interval()  //* 创建一个Interval标记
            .data(data)  //* 绑定数据
            .encode('x', 'genre')  //* 编码 x 通道
            .encode('y', 'sold')  //* 编码 y 通道
            .encode('key', 'genre')  //* 指定key
            .animate('update', { duration: 800 })  //* 指定更新动画时间


        //* 渲染可视化
        chart
            .render()
            .then(() => {
                console.log('Successfully render');
            })
            .catch((error) => {
                console.error('Failed render: ', error)
            })

        return chart;
    }

    //* 更新条形图的数据
    function updateBarChart(chart) {
        //* 获得Interval Mark
        const interval = chart.getNodesByType('interval')[0];

        //* 模拟并更新Interval的数据
        const newData = interval.data().map((d) => ({
            ...d,
            sold: Math.random() * 400 + 100,
        }));

        interval.data(newData);

        //* 重新渲染
        chart.render();
    }



    return (
        <div className='G2test'>
            <div ref={container}>
                {/* <button onClick={() => updateBarChart(chart.current)}>Update Data</button> */}
            </div>
        </div>
    )
};

export default G2test;