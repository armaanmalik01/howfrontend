import React, { useState } from 'react';
import { Card, Typography, Button, Space, Form, Input, message, Modal, App } from 'antd';
import { UserOutlined, KeyOutlined, BankOutlined, LogoutOutlined, SaveOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useLoaderData, useNavigate } from 'react-router';

const { Title, Text } = Typography;


import axios from "../utils/NetworkManager";


const Profile = () => {
  const { data: { user } } = useLoaderData();

  const { message } = App.useApp();

  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isBankDetailsModalVisible, setIsBankDetailsModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const [bankDetailsForm] = Form.useForm();
  const [loading, set_loading] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = async (values) => {
    try {
      const res = await axios.put("/api/user/change-password", values);
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
      message.success(res.data?.message);
    } catch (err) {
      if (err.response) {
        message.error(err.response.data.message)
      } else {
        message.error(err.message);
      }
    }
  };

  const handleBankDetailsSave = async (values) => {
    // Dummy logic for saving bank details
    console.log('Bank details updated:', values);
    // message.success('Bank details saved successfully!');

    set_loading(true)
    try {
      const res = await axios.put("/api/user/bank-details", values);
      message.success("Bank Details Submitted")
      setIsBankDetailsModalVisible(false);
    } catch (err) {
      if (err.response) {
        message.error(err.response.data.message)
      } else {
        message.error(err.message);
      }
    } finally {
      set_loading(false);
    }
  };

  const handleLogout = () => {
    // Dummy logout logic
    message.info('You have been logged out.');
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Title level={4} className="profile-title">
            <UserOutlined className="profile-icon" /> Profile
          </Title>
          <Button type="default" danger onClick={handleLogout} icon={<LogoutOutlined />} className="logout-button">
            Logout
          </Button>
        </div>

        <div className="profile-section">
          <Title level={5} className="section-title">
            <UserOutlined /> Personal Information
          </Title>
          <div className="user-info-row">
            <Text strong>Name:</Text>
            <Text>{user.fullName}</Text>
          </div>
          <div className="user-info-row">
            <Text strong>Phone:</Text>
            <Text>{user.phoneNumber}</Text>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <Title level={5} className="section-title">
              <KeyOutlined /> Change Password
            </Title>
            <Button
              type="primary"
              onClick={() => setIsPasswordModalVisible(true)}
              style={{ borderRadius: '0.75rem' }}
            >
              Change Password
            </Button>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <Title level={5} className="section-title">
              <BankOutlined /> Bank Details
            </Title>
            <Button
              type="primary"
              onClick={() => setIsBankDetailsModalVisible(true)}
              icon={<EditOutlined />}
              style={{ borderRadius: '0.75rem' }}
            >
              Edit
            </Button>
          </div>
          <div className="user-info-row">
            <Text strong>Account Holder:</Text>
            <Text>{user.bankDetails.accountHolderName || "Null"}</Text>
          </div>
          <div className="user-info-row">
            <Text strong>Account Number:</Text>
            <Text>{user.bankDetails.accountNumber || "Null"}</Text>
          </div>
          <div className="user-info-row">
            <Text strong>IFSC Code:</Text>
            <Text>{user.bankDetails.ifscCode || "Null"}</Text>
          </div>
          <div className="user-info-row">
            <Text strong>Bank Name:</Text>
            <Text>{user.bankDetails.bankName || "Null"}</Text>
          </div>
        </div>
      </Card>

      <Modal
        title="Change Password"
        visible={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={null}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password!' }]}
          >
            <Input.Password
              placeholder="Current Password"
              size="large"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password
              placeholder="New Password"
              size="large"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm New Password"
              size="large"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block style={{ borderRadius: '0.75rem' }}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Bank Details"
        visible={isBankDetailsModalVisible}
        onCancel={() => setIsBankDetailsModalVisible(false)}
        footer={null}
      >
        <Form
          form={bankDetailsForm}
          layout="vertical"
          initialValues={user.bankDetails}
          onFinish={handleBankDetailsSave}
        >
          <Form.Item
            name="accountHolderName"
            label="Account Holder Name"
            rules={[{ required: true, message: 'Please enter the account holder name!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: 'Please enter the bank name!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true, message: 'Please enter your account number!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="ifscCode"
            label="IFSC Code"
            rules={[{ required: true, message: 'Please enter your IFSC code!' }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" size="large" block style={{ borderRadius: '0.75rem' }}>
              Save Details
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
        //   padding: 2rem 1rem;
          // min-height: 100vh;
        //   background-color: #f3f4f6;
        }
        .profile-card {
          width: 100%;
          max-width: 600px;
        }
        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .profile-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0;
          font-weight: 700;
          color: #1f2937;
        }
        .profile-icon {
          font-size: 2rem;
          color: #2563eb;
        }
        .profile-section {
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: #374151;
        }
        .user-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .user-info-row:last-child {
          border-bottom: none;
        }
        .edit-button {
          color: #2563eb;
          border-color: #2563eb;
        }
        .ant-input-lg, .ant-btn-lg {
          border-radius: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default Profile;
