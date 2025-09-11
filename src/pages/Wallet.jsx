import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, List, App } from 'antd';
import {
  WalletOutlined,
} from '@ant-design/icons';


import { Tag, Divider } from 'antd';
import { SwapOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router';


import FinanceButton from "../components/FinanceButton";

const { Title, Text } = Typography;

const getStatusTag = (status) => {
  switch (status) {
    case 'success':
      return <Tag icon={<CheckCircleOutlined />} color="green">Success</Tag>;
    case 'pending':
      return <Tag icon={<ClockCircleOutlined />} color="orange">Pending</Tag>;
    case 'rejected':
      return <Tag icon={<CloseCircleOutlined />} color="red">Rejected</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }''
};


import axios from "../utils/NetworkManager";


const Wallet = () => {

  const data = useLoaderData();

  console.log(data);

  const [transactions, set_transactions] = useState([]);

  const { message } = App.useApp();

  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const { data } = await axios.get("/api/transactions");
        // console.log(data)
        set_transactions(data.data.transactions);
      } catch (err) {
        message.error(err.message)
      }
    }

    fetchTrans();
  }, [])


  return (
    <div className="wallet-container">
      <Card className="wallet-card">
        <div className="card-header">
          <WalletOutlined className="wallet-icon" />
          <Title level={4} className="wallet-title">My Wallet</Title>
        </div>
        <hr />
        <div className="balance-section">
          <Text level={2} className="balance-label">Current Balance</Text>
          <Title level={3} className="balance-amount">₹{data.data.balance.toFixed(2)}</Title>
        </div>
      </Card>
      <FinanceButton />


      <div className="transaction-list-container">
        <Title level={4} className="transaction-list-title">
          <SwapOutlined style={{ marginRight: '0.5rem' }} /> Transaction History
        </Title>
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(item) => (
            <List.Item className="transaction-list-item">
              <div className="list-item-content">
                <div className="main-info">
                  <div className="type-amount">
                    <Text strong className="transaction-type">{item.type}</Text>
                    <Text className="transaction-amount">₹{item.amount}</Text>
                  </div>
                  {getStatusTag(item.status)}
                </div>
                <div className="transaction-details">
                  <Text className="detail-text">ID: {item.transactionId}</Text>
                  <Text className="detail-text">{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>

      <style jsx>{`
        .transaction-list-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
        }
        .transaction-list-title {
          text-align: center;
          color: #1f2937;
        }
        .ant-list-item {
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.3s ease;
        }
        .ant-list-item:hover {
          background-color: #f9fafb;
        }
        .ant-list-item:last-child {
          border-bottom: none;
        }
        .list-item-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding:0 1.5rem;
        }
        .main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 0.5rem;
        }
        .type-amount {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .transaction-type {
          font-size: 0.8rem;
          color: #4b5563;
        }
        .transaction-amount {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }
        .transaction-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          color: #6b7280;
        }
        .detail-text {
          font-size: 0.7rem;
        }
      `}</style>

      <style jsx>{`
        .wallet-card {
          width: 100%;
          max-width: 600px;
          border-radius: 1rem;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .wallet-icon {
          font-size: 1.8rem;
          color: #2563eb;
        }

        .wallet-title {
          margin: 0;
          font-weight: 700;
        }

        .balance-section {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .balance-label {
          display: block;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .balance-amount {
          font-size: 1rem;
          font-weight: 800;   
          color: #1f2937;
        }
        
        .button-group {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .wallet-button {
          width: 50%;
          border-radius: 0.5rem;
          font-weight: 600;
        }

        .transactions-title {
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .transaction-item {
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .text-green {
          color: #16a34a;
        }

        .text-red {
          color: #ef4444;
        }

        /* Responsive adjustments */
        @media (max-width: 576px) {
          .button-group {
            flex-direction: row;
            gap: 1rem;
          }
          
          .wallet-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Wallet;
