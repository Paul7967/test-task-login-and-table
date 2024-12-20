import React, { useState } from 'react';
import { Table, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'dayjs/locale/ru';

const { RangePicker } = DatePicker;

interface EmployeeRecord {
    key: string;
    number: number;
    fullName: string;
    qualification: string;
    hireDate: string;
    workPeriod: string;
}

const mockData: EmployeeRecord[] = [
    {
        key: '1',
        number: 1,
        fullName: 'Иванов Петр Сергеевич',
        qualification: 'Старший инженер',
        hireDate: '15.03.2018',
        workPeriod: '5 лет 9 месяцев',
    },
    {
        key: '2',
        number: 2,
        fullName: 'Смирнова Анна Михайловна',
        qualification: 'Ведущий специалист',
        hireDate: '22.11.2019',
        workPeriod: '4 года 2 месяца',
    },
    {
        key: '3',
        number: 3,
        fullName: 'Кузнецов Дмитрий Александрович',
        qualification: 'Руководитель отдела',
        hireDate: '05.07.2016',
        workPeriod: '7 лет 6 месяцев',
    },
    {
        key: '4',
        number: 4,
        fullName: 'Попова Елена Игоревна',
        qualification: 'Бизнес-аналитик',
        hireDate: '10.09.2020',
        workPeriod: '3 года 4 месяца',
    },
    {
        key: '5',
        number: 5,
        fullName: 'Морозов Игорь Викторович',
        qualification: 'Системный архитектор',
        hireDate: '18.01.2017',
        workPeriod: '6 лет 11 месяцев',
    },
];

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

    const getYearWord = (years: number): string => {
        const lastDigit = years % 10;
        const lastTwoDigits = years % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'лет';
        if (lastDigit === 1) return 'год';
        if (lastDigit >= 2 && lastDigit <= 4) return 'года';
        return 'лет';
    };

    const getMonthWord = (months: number): string => {
        const lastDigit = months % 10;
        const lastTwoDigits = months % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'месяцев';
        if (lastDigit === 1) return 'месяц';
        if (lastDigit >= 2 && lastDigit <= 4) return 'месяца';
        return 'месяцев';
    };

    const columns: ColumnsType<EmployeeRecord> = [
        {
            title: 'Номер строки',
            dataIndex: 'number',
            key: 'number',
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
