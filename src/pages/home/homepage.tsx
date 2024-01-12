import { Layout } from 'antd';
import React, { Suspense } from 'react';

import HomepageHeader from './header';
import HomepageContent from './content';
import HomepageFooter from './footer';
import HomepageSkeleton from '../../components/homepage-skeleton';

const Homepage: React.FC = () => (
    <Layout>
        <HomepageHeader />
        <Suspense fallback={<HomepageSkeleton />}>
            <HomepageContent />
        </Suspense>
        <HomepageFooter />
    </Layout>
);


export default Homepage;


