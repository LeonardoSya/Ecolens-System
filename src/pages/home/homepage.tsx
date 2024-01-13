import { Layout } from 'antd';
import React, { Suspense } from 'react';
import HomepageHeader from './header';
import HomepageContent from './content';
import HomepageFooter from './footer';
import HomepageSkeleton from '../../components/homepage-skeleton';
import { useDetectPortrait } from '../../hooks/hooks';
import Warning from './warning';

const Homepage: React.FC = () => {
    const isPortrait = useDetectPortrait();

    const renderPortraitUI = () => {
        return <Warning />;
    };

    const renderLandscapeUI = () => {
        return (
            <>
                <HomepageHeader />
                <Suspense fallback={<HomepageSkeleton />}>
                    <HomepageContent />
                </Suspense>
                <HomepageFooter />
            </>
        );
    };

    return (
        <Layout>
            {isPortrait ? renderPortraitUI() : renderLandscapeUI()}
        </Layout>
    );
};


export default Homepage;


