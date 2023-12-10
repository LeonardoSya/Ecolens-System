import React, { useState } from 'react';
import { Card, Flex, Button, Typography } from 'antd';

const MyCard = () => {

    const cardStyle = {
        width: 620,
        background: "#d9d4d4",
    };
    const imgStyle = {
        display: 'block',
        width: 273,
        objectFit: 'cover',
        borderRadius: '3%'
    };

    return (
        <>
            <Card
                hoverable
                style={cardStyle}
                bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                }}
            >
                <Flex justify='sapce-between'>
                    <img
                        alt='avatar'
                        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                        style={imgStyle}
                    />
                    <Flex
                        vertical
                        align='flex-end'
                        justify='space-between'
                        style={{
                            padding: 32,
                        }}
                    >
                        <Typography.Title level={3}>
                            <i> 我非常信任 "GIS研发创赛超级小队" , 他们的产品富有创造力。爱来自林学院522</i>
                        </Typography.Title>
                        <Button type='primary' href='https://github.com/LeonardoSya' target='_blank'>
                            Learn More About Our Team {': )'}
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </>
    )
}

export default MyCard;