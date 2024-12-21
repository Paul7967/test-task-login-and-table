import React, { useState, useMemo } from 'react';
import { Table, DatePicker, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';
import { mockData, EmployeeRecord } from './tableMockData';
import {
    formatYearWord,
    formatMonthWord,
    formatDayWord,
} from '../../utils/dateUtils';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ru');

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportTable: React.FC = () => {
    const [data, setData] = useState<EmployeeRecord[]>(mockData);
    const [editingWorkPeriod, setEditingWorkPeriod] = useState<string | null>(
        null
    );

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

    const calculateWorkPeriod = (startDate: Dayjs, endDate: Dayjs): string => {
        const years = endDate.diff(startDate, 'year');
        const months = endDate.diff(startDate, 'month') % 12;
        const days = endDate.diff(startDate, 'day') % 30;

        const periodParts = [];
        if (years > 0) {
            periodParts.push(`${years} ${formatYearWord(years)}`);
        }
        if (months > 0) {
            periodParts.push(`${months} ${formatMonthWord(months)}`);
        }
        if (days > 0) {
            periodParts.push(`${days} ${formatDayWord(days)}`);
        }

        return periodParts.join(' ') || '0 дней';
    };

    const handleWorkPeriodChange = (
        record: EmployeeRecord,
        dates: [Dayjs | null, Dayjs | null] | null
    ) => {
        const newData = [...data];
        const index = newData.findIndex((item) => item.key === record.key);

        if (index > -1 && dates && dates[0] && dates[1]) {
            const [startDate, endDate] = dates;
            const workPeriod = calculateWorkPeriod(startDate, endDate);

            newData[index] = {
                ...newData[index],
                workPeriod: workPeriod,
                startDate: startDate.format('DD.MM.YYYY'),
                endDate: endDate.format('DD.MM.YYYY'),
            };
            setData(newData);
        }
        setEditingWorkPeriod(null);
    };

    const handleQualificationChange = (
        record: EmployeeRecord,
        value: string
    ) => {
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
        return [...new Set(data.map((item) => item.qualification))];
    }, [data]);

    const columns: ColumnsType<EmployeeRecord> = [
        {
            title: '№',
            dataIndex: 'number',
            key: 'number',
            width: 90,
            align: 'center',
            title: () => <div style={{ textAlign: 'center' }}>№</div>,
        },
        {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',
            title: () => <div style={{ textAlign: 'center' }}>ФИО</div>,
            width: 200,
            minWidth: 200,
        },
        {
            title: 'Квалификация',
            dataIndex: 'qualification',
            key: 'qualification',
            title: () => (
                <div style={{ textAlign: 'center' }}>Квалификация</div>
            ),
            width: 200,
            minWidth: 200,
            render: (text, record) => (
                <Select
                    style={{ width: '100%' }}
                    value={record.qualification}
                    onChange={(value) =>
                        handleQualificationChange(record, value)
                    }
                >
                    {qualificationOptions.map((option) => (
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
            title: () => <div style={{ textAlign: 'center' }}>Дата найма</div>,
            width: 200,
            minWidth: 200,
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
            width: 350,
            minWidth: 350,
            title: () => (
                <div style={{ textAlign: 'center' }}>Период работы</div>
            ),
            render: (text, record) => {
                if (editingWorkPeriod === record.key) {
                    return (
                        <RangePicker
                            locale={locale}
                            format="DD.MM.YYYY"
                            onOpenChange={(open) => {
                                if (!open) {
                                    setEditingWorkPeriod(null);
                                }
                            }}
                            onChange={(dates) =>
                                handleWorkPeriodChange(record, dates)
                            }
                        />
                    );
                }

                return (
                    <div
                        onClick={() => setEditingWorkPeriod(record.key)}
                        style={{ cursor: 'pointer' }}
                    >
                        {text}
                    </div>
                );
            },
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default ReportTable;
