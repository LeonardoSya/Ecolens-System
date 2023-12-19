import { Player } from '@galacean/effects';
import React, { memo, useRef, useEffect } from 'react';

// 动画资源
const myAnimation = '05_antd/02_布局/vite-project/src/assets/银河.json';
// 降级图片
// const downgradeImage = '${DowngradeImagePath}';

const Galaxy = (props) => {

    const containerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {

        if (containerRef.current) {  // check if containerRef.current is not null
            console.log(typeof containerRef.current, typeof playerRef.current);

            if (!playerRef.current) {
                // 实例化一个Galacean Effects播放器
                const player = playerRef.current = new Player({
                    container: containerRef.current,
                    env: 'PC'
                })

                // 加载动画资源并播放
                player
                    .loadScene(myAnimation)
                    .catch((err) => {
                        // 降级逻辑
                        console.error(err);
                    })
            }
        }

        return () => {
            playerRef.current && playerRef.current.destroy();
            playerRef.current = null;
        }
    }, [props.show, containerRef.current]);

    return props.show && <div className='galaxy-container' style={{ width: '100vw', height: '100vh' }} ref={containerRef} />
}


export default Galaxy;