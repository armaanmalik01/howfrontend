import { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Flex, App } from 'antd';
import { UserOutlined, PhoneOutlined, LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router";

import axios from '../utils/NetworkManager';

// The main App component that contains the registration form.
const Register = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  let code = "";
  if (window.location.search.includes("code")) {
    code = window.location.search.split("=").at(-1);
  }

  // This function is called when the form submission is successful and all fields are validated.
  const navigate = useNavigate();
  const [loading, set_loading] = useState(false);
  const onFinish = async (values) => {
    set_loading(true);
    try {
      const res = await axios.post('/api/auth/register', values);
      message.success(res.data?.message);

      localStorage.setItem("token", res.data.data.token);
      axios.defaults.headers.Authorization = `Bearer ${res.data.data.token}`
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        message.error(err.response?.data?.message);
      } else {
        message.error(err.message)
      }

    } finally {
      set_loading(false)
    }
  };


  // This function is called if the form submission fails due to validation errors.
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form for errors.');
  };

  // A custom validator for the referral code field.
  // This could be extended with more complex logic (e.g., checking against a list of valid codes).
  const validateReferralCode = (_, value) => {
    if (value && value.length < 5) {
      return Promise.reject(new Error('Referral code must be at least 5 characters long!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="registration-container">
      <Card
        className="registration-card"
        title={
          <Typography.Title level={3} style={{ textAlign: 'center', fontWeight: 'bold', color: '#1f2937' }}>
            Create an Account
          </Typography.Title>
        }
      >
        <Form
          form={form}
          name="registration"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
          initialValues={{ referralCode: code }}
        >
          {/* Name field */}
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter your full name!' },
              { min: 3, message: 'Name must be at least 3 characters.' }
            ]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder="e.g., Jane Doe" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          {/* Phone Number field */}
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number!' },
              {
                pattern: /^\d{10,15}$/,
                message: 'Phone number is invalid'
              }
            ]}
          >
            <Input size='large' prefix={<PhoneOutlined />} placeholder="e.g., 1234567890" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          {/* Password field */}
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password!' },
              {
                min: 5,
                message: 'Password must be at least 5 characters long.'
              },
            ]}
            hasFeedback
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="Enter password" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          {/* Referral Code field */}
          <Form.Item
            name="referralCode"
            label="Referral Code"
            rules={[
              { required: true, message: 'Please enter a referral code!' },
              { validator: validateReferralCode }
            ]}
          >
            <Input size='large' prefix={<QrcodeOutlined />} placeholder="Enter referral code" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              size="large"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Flex align='center' justify='space-between' style={{ padding: "10px 2px" }}>
          <div>
            <Link style={{ color: "#7132f5" }} to="/">Login</Link>
          </div>
          <div>
            <Link style={{ color: "#7132f5" }} to="/forget">Forget Password</Link>
          </div>
        </Flex>
      </Card>

      <style jsx>{`
        .registration-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f6f5fa;
           padding: 0.8rem;
        }
        
        @media (min-width: 640px) {
          .registration-container {
            padding: 1.5rem;
          }
        }

        .registration-card {
          width: 100%;
          max-width: 448px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-radius: 1rem;
          background-color: #ffffff;
          
        }

        @media (min-width: 640px) {
          .registration-card {
            max-width: 448px;
            padding: 2rem;
          }
        }
        
        .submit-button {
          width: 100%;
          border-radius: 0.5rem;
          color: #ffffff;
          font-weight: 600;
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </div>
  );
};

export default Register;
