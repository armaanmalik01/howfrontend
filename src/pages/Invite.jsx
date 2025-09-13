import React, { useState } from 'react';
import { Card, Typography, Button, Space, Input, List, message, QRCode } from 'antd';
import { ShareAltOutlined, QrcodeOutlined, CopyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;


const referralTerms = [
  'You and your friend will receive ₹50 when they sign up using your referral code.',
  'Your friend must complete their first purchase to be considered a valid referral.',
  'Your unique referral code is valid for a single use.',
  'Referral earnings will be credited to your wallet within 24 hours of a successful referral.'
];

const Invite = () => {
  const referralLink = `${window.location.origin}/register?code=${localStorage.getItem("ref_code")}`;


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      message.success('Referral link copied to clipboard!');
    }).catch(err => {
      message.error('Failed to copy the link.');
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="invite-container">
      <Card className="invite-card">
        <Title level={2} className="invite-title">
          <ShareAltOutlined className="invite-icon" /> Invite & Earn
        </Title>
        <Text type="secondary" style={{ marginBottom: '2rem', display: 'block', textAlign: 'center' }}>
          Share your unique referral link with your friends to start earning.
        </Text>

        <div className="link-section">
          <Title level={4}>Your Referral Link</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input.Group compact>
              <Input
                style={{ width: 'calc(100% - 70px)', borderRadius: '0.75rem 0 0 0.75rem', padding: '0.6rem 1rem' }}
                defaultValue={referralLink}
                readOnly
              />
              <Button
                type="primary"
                onClick={handleCopy}
                icon={<CopyOutlined />}
                style={{ borderRadius: '0 0.75rem 0.75rem 0', padding: '0 1rem' }}
              />
            </Input.Group>
            <Button
              type="primary"
              onClick={handleCopy}
              block
              size="large"
              icon={<CopyOutlined />}
              style={{ marginTop: '0.5rem', borderRadius: '0.75rem' }}
              className="copy-button-mobile"
            >
              Copy Link
            </Button>
          </Space>
        </div>

        <div className="qr-section">
          <Title level={4}>Or Scan to Share</Title>
          <div className="qr-code-wrapper">
            <QRCode value={referralLink} />
          </div>
        </div>

        <div className="terms-section">
          <Title level={4}>Referral Terms</Title>
          <List
            dataSource={referralTerms}
            renderItem={item => (
              <List.Item className="terms-item">
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>
      </Card>
      
      <style jsx>{`
        .invite-container {
          display: flex;
          justify-content: center;
          min-height: 100vh;
          background-color: #f3f4f6;
          font-family: 'Inter', sans-serif;
        }
        .invite-card {
          width: 100%;
          max-width: 600px;
        }
        .invite-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          color: #1f2937;
        }
        .invite-icon {
          font-size: 2rem;
          color: #2563eb;
        }
        .link-section, .qr-section, .terms-section {
          text-align: center;
          margin-top: 2rem;
        }
        .qr-code-wrapper {
          display: flex;
          justify-content: center;
          margin: 1.5rem 0;
        }
        .qr-code {
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }
        .terms-item {
          padding: 0.5rem 0;
          border-bottom: none;
        }
        .terms-item:last-child {
          border-bottom: none;
        }
        .copy-button-mobile {
          display: none;
        }
        @media (max-width: 576px) {
          
          .ant-input-group-compact .ant-input, .ant-input-group-compact .ant-btn {
            border-radius: 0.75rem !important;
          }
          .ant-input-group-compact .ant-input {
            margin-bottom: 0.5rem;
          }
          .copy-button-mobile {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default Invite;

