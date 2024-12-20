import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './appLayout.module.css';
import NavBar from '../NavBar';

const { Header, Content } = Layout;

const AppLayout: React.FC = () => {
    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <NavBar />
            </Header>
            <Content className={styles.content}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default AppLayout;
