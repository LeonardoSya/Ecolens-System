import React, { useContext } from 'react';
import type { TourProps } from 'antd';
import { Tour } from 'antd';
import { GuideContext } from '../models/tour-context';
import { QuestionCircleFilled } from '@ant-design/icons';
import {rsButtonImage, rsTooltipImage} from '../assets/images/images';

const RoadmingGuide: React.FC = () => {
    const { refs, open, setOpen } = useContext(GuideContext);

    const steps: TourProps['steps'] = [
        {
            title: "Switch The Map",
            description: "点此切换地图",
            cover: (
                <>
                    <img
                        alt='tour.png'
                        src={rsButtonImage}
                        style={{ width: '6rem' }}
                    />
                    <img
                        alt='tour.png'
                        src={rsTooltipImage}
                        style={{ width: '18rem' }}
                    />
                </>
            ),
            target: () => refs.ref1.current,
        }, {
            title: "View the Map Documentation",
            description: "查看地图说明文档",
            target: () => refs.ref2.current,
        }, {
            title: "Enlarge To Full Screenr",
            description: "放大至全屏",
            target: () => refs.ref3.current,
        },
        {
            title: "Edit in the Map",
            description: "在Ecolens中编辑",
            target: () => refs.ref4.current,
        },
        {
            title: "View Product Documentation",
            description: "查看产品文档",
            target: () => refs.ref5.current,
        },
    ];


    return (
        <>
            <Tour
                steps={steps}
                open={open}
                onClose={() => setOpen(false)}
            />
            <QuestionCircleFilled type='primary' onClick={() => setOpen(true)} style={{ position: 'absolute', fontSize: '2rem', right: "2.2vw", top: "10vh" }}>Tour</QuestionCircleFilled>
        </>

    )
}

export default RoadmingGuide;