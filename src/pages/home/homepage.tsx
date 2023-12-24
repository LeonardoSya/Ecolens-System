import { Layout } from 'antd';
import React from 'react';

import HomepageHeader from './header';
import HomepageContent from './content';
import HomepageFooter from './footer';


const Homepage = () => (
    <Layout>
        <HomepageHeader />
        <HomepageContent />
        <HomepageFooter />
    </Layout>
);


export default Homepage;


