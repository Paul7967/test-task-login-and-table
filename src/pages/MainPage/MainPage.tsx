import { Flex, Space } from 'antd';
import React from 'react';
import ReportTable from '../../components/ReportTable';

const MainPage: React.FC = () => {
    return (
        <Flex vertical>
            <h1>Главная страница</h1>
            <Space />
            <ReportTable />
        </Flex>
    );
};

export default MainPage;
