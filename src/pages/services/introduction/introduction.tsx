import React, { useState, useEffect, useCallback, useRef } from 'react';
import Floatbutton from '../../../components/floatbutton';
import { marked } from 'marked';
import './introduction.css'

const Introduction = () => {
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
            .then(data => {
                // github api 返回的内容是 base64编码的，因此需要解码
                // 使用 decodeURIComponent 和 escape 函数来处理 UTF-8 编码的文本
                const markdown = decodeURIComponent(escape(atob(data.content)));
                setReadme(marked(markdown));
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