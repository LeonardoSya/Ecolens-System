import { Layout } from 'antd';
import React from 'react';

import HomepageHeader from './header';
import HomepageContent from './content';
import HomepageFooter from './footer';


const Homepage = () => (
    <Layout
        style={{
            width: '75.6vw',
            height: '115vh'
        }}>
        <HomepageHeader />
        <HomepageContent />
        <HomepageFooter />
    </Layout>
);


export default Homepage;


