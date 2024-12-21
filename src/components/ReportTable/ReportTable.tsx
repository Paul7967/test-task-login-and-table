import React, { useState, useMemo } from 'react';
import { Table, DatePicker, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';
import { mockData, EmployeeRecord } from './tableMockData';
import { getYearWord, getMonthWord } from './reportTableUtils';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportTable: React.FC = () => {
    const [data, setData] = useState<EmployeeRecord[]>(mockData);

    const handleDateChange = (record: EmployeeRecord, date: Dayjs | null) => {
        if (date) {
            const newData = [...data];
            const index = newData.findIndex((item) => item.key === record.key);
            if (index > -1) {
                newData[index] = {
                    ...newData[index],
                    hireDate: date.format('DD.MM.YYYY'),
                };
                setData(newData);
            }
        }
    };

    const handleWorkPeriodChange = (
        record: EmployeeRecord,
        dates: [Dayjs | null, Dayjs | null] | null
    ) => {
        const newData = [...data];
        const index = newData.findIndex((item) => item.key === record.key);
        
        if (index > -1 && dates && dates[0] && dates[1]) {
            const [startDate, endDate] = dates;
            const years = endDate.diff(startDate, 'year');
            const months = endDate.diff(startDate.add(years, 'year'), 'month');
            
            const workPeriod = [
                years > 0 ? `${years} ${getYearWord(years)}` : '',
                months > 0 ? `${months} ${getMonthWord(months)}` : '',
            ]
                .filter(Boolean)
                .join(' ');

            newData[index] = {
                ...newData[index],
                workPeriod: workPeriod || '0 месяцев',
            };
            setData(newData);
        }
    };

    const handleQualificationChange = (record: EmployeeRecord, value: string) => {
        const newData = [...data];
        const index = newData.findIndex((item) => item.key === record.key);
        if (index > -1) {
            newData[index] = {
                ...newData[index],
                qualification: value,
            };
            setData(newData);
        }
    };

    const qualificationOptions = useMemo(() => {
        return [...new Set(data.map(item => item.qualification))];
    }, [data]);

    const columns: ColumnsType<EmployeeRecord> = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: 90,
            align: 'center',
        },
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Квалификация',
            dataIndex: 'qualification',
            key: 'qualification',
            render: (text, record) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.qualification}
                    onChange={(value) => handleQualificationChange(record, value)}
                >
                    {qualificationOptions.map(option => (
                        <Option key={option} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Дата найма',
            dataIndex: 'hireDate',
            key: 'hireDate',
            render: (text, record) => (
                <DatePicker
                    locale={locale}
                    format="DD.MM.YYYY"
                    defaultValue={null}
                    onChange={(date) => handleDateChange(record, date)}
                />
            ),
        },
        {
            title: 'Период работы',
            dataIndex: 'workPeriod',
            key: 'workPeriod',
            render: (text, record) => (
                <RangePicker
                    locale={locale}
                    format="DD.MM.YYYY"
                    onChange={(dates) => handleWorkPeriodChange(record, dates)}
                />
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default ReportTable;
