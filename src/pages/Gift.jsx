import React, { useState } from 'react';
import { Card, Typography, Button, Space, Input, List, message, Spin } from 'antd';
import { GiftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const giftTerms = [
  'Each gift code is valid for one-time use only.',
  'Gift codes cannot be combined with other offers.',
  'The bonus will be credited to your wallet immediately upon successful redemption.',
  'Gift codes are non-transferable and have no cash value.'
];

const Gift = () => {
  const [giftCode, setGiftCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRedeem = () => {
    if (!giftCode) {
      message.error('Please enter a gift code.');
      return;
    }

    setLoading(true);

    // Dummy API call to simulate redemption process
    setTimeout(() => {
      setLoading(false);
      if (giftCode.toUpperCase() === 'GIFT100') {
        message.success('Congratulations! Your gift of ₹100 has been credited to your wallet.');
        setGiftCode(''); // Clear input on success
      } else {
        message.error('Invalid or expired gift code. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="gift-container">
      <Card className="gift-card">
        <Title level={3} className="gift-title">
          <GiftOutlined className="gift-icon" /> Redeem Gift Code
        </Title>
        <Text type="secondary" style={{ marginBottom: '2rem', display: 'block', textAlign: 'center' }}>
          Enter your unique gift code to receive your bonus.
        </Text>

        <div className="redeem-section">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Enter your gift code"
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
              size="large"
              style={{ borderRadius: '0.75rem', padding: '0.6rem 1rem' }}
            />
            <Button
              type="primary"
              onClick={handleRedeem}
              loading={loading}
              block
              size="large"
              style={{ borderRadius: '0.75rem', fontWeight: 'bold' }}
            >
              {loading ? <Spin size="small" /> : 'Redeem Now'}
            </Button>
          </Space>
        </div>

        <div className="terms-section">
          <Title level={4}>Gift Code Terms</Title>
          <List
            dataSource={giftTerms}
            renderItem={item => (
              <List.Item className="terms-item">
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </div>
      </Card>
      
      <style jsx>{`
        .gift-container {
          display: flex;
          justify-content: center;
        }
        .gift-card {
          width: 100%;
          max-width: 500px;
          border-radius: 1rem;
        }
        .gift-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          color: #1f2937;
        }
        .gift-icon {
          font-size: 2rem;
          color: #2563eb;
        }
        .redeem-section, .terms-section {
          text-align: center;
          margin-top: 2rem;
        }
        .terms-item {
          padding: 0.5rem 0;
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default Gift;
