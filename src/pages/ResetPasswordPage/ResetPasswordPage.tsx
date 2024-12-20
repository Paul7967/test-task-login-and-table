import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './resetPasswordPage.module.css';

const ResetPasswordPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { newPassword: string; confirmPassword: string }) => {
        setLoading(true);
        try {
            // Логика сброса пароля
            if (values.newPassword === values.confirmPassword) {
                message.success('Пароль успешно изменен');
                navigate('/login');
            }
        } catch (error) {
            message.error('Ошибка сброса пароля');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.resetPasswordContainer}>
            <Card className={styles.resetPasswordCard}>
                <h2 className={styles.resetPasswordTitle}>Сброс пароля</h2>
                <Form
                    name="reset-password"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="newPassword"
                        rules={[
                            { 
                                required: true, 
                                message: 'Пожалуйста, введите новый пароль' 
                            },
                            {
                                min: 6,
                                message: 'Пароль должен содержать не менее 6 символов'
                            }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Новый пароль" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { 
                                required: true, 
                                message: 'Пожалуйста, подтвердите новый пароль' 
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Повтор нового пароля" 
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            loading={loading}
                            className={styles.resetPasswordButton}
                        >
                            Сбросить пароль
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;