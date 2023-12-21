import React, { useState } from 'react';
import useSafeState from '../hooks/useSafeState';

const workSpace = 'yashixiang';
const date = '2013-03-01';
const protocol = 'wms';
const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

const MapSelector = ({ onSelect }) => {
    const [selectedDate, setSelectedDate] = useSafeState('2013-03-01');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        onSelect(e.target.value);
    };

    return (
        <select value={selectedDate} onChange={handleDateChange}>
            <option value="2013-03-01">2013-03-01</option>
            <option value="2013-06-01">2013-06-01</option>
            <option value="2013-09-01">2013-09-01</option>
            <option value="2023-06-01">2023-06-01</option>
        </select>
    );
};

export default MapSelector;