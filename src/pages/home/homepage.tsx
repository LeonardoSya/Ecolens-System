import { Layout } from 'antd';
import React, { Suspense } from 'react';

import HomepageHeader from './header';
import HomepageContent from './content';
import HomepageFooter from './footer';
import HomepageSkeleton from '../../components/homepage-skeleton';
import { useDetectPortrait } from '../../hooks/hooks';

const Homepage: React.FC = () => {
    const isPortrait = useDetectPortrait();

    return (
        <Layout>
            {isPortrait ? (
            <div>请将手机横屏以获得最佳体验</div>
            ) :
            <>
                    <HomepageHeader />
                    <Suspense fallback={<HomepageSkeleton />}>
                        <HomepageContent />
                    </Suspense>
                    <HomepageFooter />
            </>
            }

        </Layout>
    )
};


export default Homepage;


