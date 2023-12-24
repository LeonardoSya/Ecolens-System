import React, { useEffect, useRef } from 'react';
import './index.css';

const Spotlight: React.FC = () => {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateSpotlight = (e: MouseEvent) => {
            if (rootRef.current) {
                rootRef.current.style.setProperty("--x", `${e.pageX}px`);
                rootRef.current.style.setProperty("--y", `${e.pageY}px`);
            }
        };

        window.addEventListener("pointermove", updateSpotlight);
        window.addEventListener("pointerdown", updateSpotlight);

        return () => {
            window.removeEventListener("pointermove", updateSpotlight);
            window.removeEventListener("pointerdown", updateSpotlight);
        };
    }, []);

    return (
        <div ref={rootRef} className='spotlight-container'>
            <div id='bg'></div>
            <div id="bg_mask"></div>
            <main>
                <h1>Spotlight</h1>
                <h2>- focus -</h2>
            </main>
            <div id="spotlight"></div>
        </div>
    );
}

export default Spotlight;