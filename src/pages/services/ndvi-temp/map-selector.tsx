import React from 'react';
// @ts-ignore
import { Select, message } from 'antd';
import { useSafeState } from '../../../hooks/hooks';

const { Option } = Select;

interface MapSelectorProps {
    onSelect: (value: string) => void;
    startDate: string;
    endDate: string;
}

const MapSelector: React.FC<MapSelectorProps> = ({ onSelect, startDate, endDate }) => {
    const [selectedDate, setSelectedDate] = useSafeState<string>('2022-12-01');
    const dates = generateDates(new Date(startDate), new Date(endDate), 3);
    // const [messageApi] = message.useMessage();

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
        onSelect(value);
    };

    // const info = () => {
    //     messageApi.info('You have switched to xxx page.');
    // };

    return (
        <Select value={selectedDate} onChange={handleDateChange} style={{ width: "14vw" }}>
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