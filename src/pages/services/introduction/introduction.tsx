import React, { useState, useEffect, useCallback, useRef } from 'react';
import Floatbutton from '../../../components/floatbutton';
import { marked } from 'marked';
import './introduction.css'

const Introduction:React.FC = () => {
    const [readme, setReadme] = useState('');
    const mapRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = useCallback(() => {
        const mapElement = mapRef?.current;
        if (!document.fullscreenElement && mapElement) {
            mapElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    }, []);

    useEffect(() => {
        fetch('https://api.github.com/repos/LeonardoSya/Ecolens-System/readme')
            .then(response => response.json())
            .then(async data => {
                // github api 返回的内容是 base64编码的，因此需要解码
                // 使用 TextDecoder 来处理 UTF-8编码的文本
                const base64decoded = atob(data.content);
                const uint8Array = new Uint8Array(base64decoded.split("").map(char => char.charCodeAt(0)));
                const markdown = new TextDecoder('utf-8').decode(uint8Array);

                // 处理可能的异步 marked 函数  确保只有在Promise解决后，渲染后的markdown内容才会被传递给setReadme
                setReadme(await marked(markdown));
            })
            .catch(error => console.error('failed to fetch README', error));
    }, []);

    return (
        <>
            <div ref={mapRef} style={{ fontFamily: "Noto Sans SC ,Poppins" }} className='readme-container' dangerouslySetInnerHTML={{ __html: readme }} />
            <Floatbutton toggleFullScreen={toggleFullScreen} titleDescription='产品文档' infoDescription='Ecolens System 地图服务介绍' />
        </>
    )
}

export default Introduction;