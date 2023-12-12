import { Layout } from 'antd';
import React from 'react';

import HomePage_Header from '../Components/layouts/HomePage_Header';
import HomePage_Content from '../Components/layouts/HomePage_Content';
import HomePage_Footer from '../Components/layouts/HomePage_Footer';


const MyHomePage = () => {
    return (
        <>
            <Layout
                style={{
                    width: '75.6vw',
                    height: '105vh'
                }}>
                <HomePage_Header />
                <HomePage_Content />
                <HomePage_Footer />
            </Layout>
        </>

    )
}

export default MyHomePage;


