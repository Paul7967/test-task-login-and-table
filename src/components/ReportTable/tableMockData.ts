export interface EmployeeRecord {
    key: string;
    number: number;
    fullName: string;
    qualification: string;
    hireDate: string;
    workPeriod: string;
}

export const mockData: EmployeeRecord[] = [
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