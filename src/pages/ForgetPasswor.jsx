import React from 'react';
import { Form, Input, Button, Card, Typography, message, Flex } from 'antd';
import { UserOutlined, PhoneOutlined, LockOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Link } from "react-router";


// The main App component that contains the registration form.
const ForgatePassword = () => {
  const [form] = Form.useForm();

  // This function is called when the form submission is successful and all fields are validated.
  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Login successful!');
    // In a real application, you would send this data to a backend API here.
    // e.g., registerUser(values).then(response => ...).catch(error => ...);
  };

  // This function is called if the form submission fails due to validation errors.
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form for errors.');
  };

  return (
    <div className="registration-container">
      <Card
        className="registration-card"
        title={
          <Typography.Title level={3} style={{ textAlign: 'center', fontWeight: 'bold', color: '#1f2937' }}>
            Enter Your Credentials
          </Typography.Title>
        }
      >
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          autoComplete="off"
        >
          {/* Name field */}
          {/* <Form.Item
            name="name"
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter your full name!' },
              { min: 3, message: 'Name must be at least 3 characters.' }
            ]}
          >
            <Input size='large' prefix={<UserOutlined />} placeholder="e.g., Jane Doe" style={{ borderRadius: '0.5rem' }} />
          </Form.Item> */}

          {/* Phone Number field */}
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter Registered phone number!' },
              {
                pattern: /^\d{10,15}$/,
                message: 'Phone number is invalid'
              }
            ]}
            
          >
            <Input addonAfter={<Button type="primary">OTP</Button>} size='large' prefix={<PhoneOutlined />} placeholder="e.g., 1234567890" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          <Form.Item
            name="otp"
            label="Enter OTP"
            rules={[
              { required: true, message: 'Please enter OTP' },
            ]}
          >
            <Input size='large' prefix={<QrcodeOutlined />} placeholder="Enter OTP code" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>


          {/* Password field */}
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter New password!' },
              {
                min: 5,
                message: 'Password must be at least 5 characters long.'
              },
            ]}
          >
            <Input.Password size='large' prefix={<LockOutlined />} placeholder="Enter New password" style={{ borderRadius: '0.5rem' }} />
          </Form.Item>

          

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              size="large"
            >
              Forget Password
            </Button>
          </Form.Item>
        </Form>
        <Flex align='center' justify='space-between' style={{padding:"10px 2px"}}>
          <div>
            <Link style={{color:"#7132f5"}} to="/register">Register</Link>
          </div>
          <div>
            <Link style={{color:"#7132f5"}} to="/">Login</Link>
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
          margin:10px 0px;
        }
      `}</style>
    </div>
  );
};

export default ForgatePassword;
