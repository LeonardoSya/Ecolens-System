import React, { useContext, useState } from 'react';
import type { TourProps } from 'antd';
import { Tour, Popover } from 'antd';
import { GuideContext } from '../models/tour-context';
import { rsButtonImage, rsTooltipImage } from '../assets/images/images';
import './tour.css';

const RoadmingGuide: React.FC = () => {
    const { refs, open, setOpen } = useContext(GuideContext);
    const [clicked, setClicked] = useState<boolean>(true);

    const handleClickChange = (open: boolean) => {
        setClicked(open);
    }

    const clickContent = <div>Click me !</div>;

    const steps: TourProps['steps'] = [
        {
            title: "Switch The Map",
            description: "点此切换地图",
            cover: (
                <>
                    <img
                        alt='tour.png'
                        src={rsButtonImage}
                        style={{ width: '6vw' }}
                    />
                    <img
                        alt='tour.png'
                        src={rsTooltipImage}
                        style={{ width: '18vw' }}
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
            <Popover
                content={clickContent}
                placement='left'
                trigger="click"
                open={clicked}
                onOpenChange={handleClickChange}
            >
                <button onClick={() => setOpen(true)} style={{ position: 'absolute', background: 'none', transformOrigin:'50% 50%',transform: 'scale(0.4)', right: "-1vw", top: "0.5vw" }}>
                    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
                        <div className="wheel"></div>
                        <div className="hamster">
                            <div className="hamster__body">
                                <div className="hamster__head">
                                    <div className="hamster__ear"></div>
                                    <div className="hamster__eye"></div>
                                    <div className="hamster__nose"></div>
                                </div>
                                <div className="hamster__limb hamster__limb--fr"></div>
                                <div className="hamster__limb hamster__limb--fl"></div>
                                <div className="hamster__limb hamster__limb--br"></div>
                                <div className="hamster__limb hamster__limb--bl"></div>
                                <div className="hamster__tail"></div>
                            </div>
                        </div>
                        <div className="spoke"></div>
                    </div>
                </button>

            </Popover>
        </>

    )
}

export default RoadmingGuide;