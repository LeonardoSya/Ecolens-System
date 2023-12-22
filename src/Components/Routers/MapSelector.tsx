import React from 'react';
import { Select } from 'antd';
import { useSafeState } from '../hooks/hooks';

const { Option } = Select;

// const workspace = 'yashixiang';
// const date = '2013-03-01';
// const protocol = 'wms';
// const domain = 'https://electric-duly-peacock.ngrok-free.app/geoserver/'

interface MapSelectorProps {
    onSelect: (value: string) => void;
    startDate: string;
    endDate: string;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onSelect,startDate,endDate }) => {
    const [selectedDate, setSelectedDate] = useSafeState<string>('2023-03-01');
    const dates = generateDates(new Date(startDate), new Date(endDate), 3);

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
        onSelect(value);
    };

    return (
        <Select value={selectedDate} onChange={handleDateChange} style={{ width: 200 }}>
            {dates.map(date => (
                <Option key={date} value={date}>{date}</Option>
            ))}
        </Select>
    );
};

const generateDates = (startDate: Date, endDate: Date, monthInterval: number): string[] => {
    let current = new Date(startDate.getTime());
    const dates: string[] = [];
    while (current <= endDate) {
        dates.push(current.toISOString().split('T')[0]);
        current.setMonth(current.getMonth() + monthInterval);
    }
    return dates;
}

export default MapSelector;