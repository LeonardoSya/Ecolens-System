import { useState, useEffect } from 'react';

const useDetectPortrait = () => {
    const [isePortrait, setIsPortrait] = useState(
        window.innerWidth < window.innerHeight*0.8
    );

    useEffect(() => {
        function handleResize() {
            setIsPortrait(window.innerWidth < window.innerHeight*0.8);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isePortrait;
}

export default useDetectPortrait;