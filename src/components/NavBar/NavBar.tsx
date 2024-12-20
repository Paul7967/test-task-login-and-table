import { Menu } from 'antd';
import styles from './navBar.module.css';
import { Link } from 'react-router-dom';

const navItems = [
    { key: 'login', label: 'Login', path: '/login' },
    { key: 'main', label: 'Main', path: '/main' },
    {
        key: 'reset-password',
        label: 'Reset Password',
        path: '/reset-password',
    },
];

const NavBar = () => {
    return (
        <Menu theme="light" mode="horizontal" className={styles.menu}>
            {navItems.map((item) => (
                <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default NavBar;
