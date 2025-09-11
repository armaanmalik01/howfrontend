import React, { useState } from 'react';
import { Card, Typography, List, Tag, Space, Button, Tabs } from 'antd';
import { ShoppingOutlined, DollarOutlined, CalendarOutlined, ThunderboltOutlined, CarryOutOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

import { useLoaderData } from "react-router";


const getStatusTag = (status) => {
  switch (status) {
    case 'completed':
      return <Tag icon={<CarryOutOutlined />} color="success">{status}</Tag>;
    case 'active':
      return <Tag icon={<SyncOutlined spin />} color="processing">{status}</Tag>;
    default:
      return <Tag>{status}</Tag>;
  }
};

const Order = () => {
  const [activeTab, setActiveTab] = useState('active');
  const { data: { orders } } = useLoaderData();
  const activeProducts = orders.filter(item => item.status === 'active');
  const expiredProducts = orders.filter(item => item.status === 'completed');

  console.log(orders)

  return (
    <div className="orders-container">
      <Card className="orders-card">
        <Title level={4} className="orders-title">
          <ShoppingOutlined className="orders-icon" /> My Orders
        </Title>
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered className="orders-tabs">
          <TabPane tab="Active Products" key="active">
            <List
              itemLayout="vertical"
              dataSource={activeProducts}
              renderItem={item => (
                <List.Item className="order-item">
                  <List.Item.Meta
                    avatar={<img className="order-image" alt={item.productId.productName} src={item.productId.productImage} />}
                    title={
                      <div className="order-header">
                        <Text strong>{item.productId.productName}</Text>
                        <Text type="secondary" className="order-date">Ordered: {new Date(item.createdAt).toLocaleDateString()}</Text>
                      </div>
                    }
                    description={
                      <>
                        <div className="order-details">
                          <Space>
                            <DollarOutlined /> <Text strong>₹ {item.productId.perDayEarning * item.validity} Target</Text>
                          </Space>
                          <Space>
                            <DollarOutlined /> <Text strong>₹ {item.productId.perDayEarning}/daily</Text>
                          </Space>
                          <Space>
                            <CalendarOutlined /> Ex: <Text>{new Date(item.endDate).toLocaleDateString()}</Text>
                          </Space>
                          <div className="order-status-tag">
                            {getStatusTag(item.status)}
                          </div>
                        </div>
                      </>
                    }
                  />
                  {/* <Button type="primary" className="track-button">Track Order</Button> */}
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Expired Products" key="expired">
            <List
              itemLayout="vertical"
              dataSource={expiredProducts}
              renderItem={item => (
                <List.Item className="order-item">
                  <List.Item.Meta
                    avatar={<img className="order-image" alt={item.productName} src={item.productImage} />}
                    title={
                      <div className="order-header">
                        <Text strong>{item.productId.productName}</Text>
                        <Text type="secondary" className="order-date">Expired: {new Date(item.endDate).toLocaleDateString()}</Text>
                      </div>
                    }
                    description={
                      <>
                        <div className="order-details">
                          <Space>
                            <DollarOutlined /> <Text strong>₹{(item.productId.perDayEarning * item.validity)} Earned</Text>
                          </Space>
                          <Space>
                            <CalendarOutlined /> <Text>{item.validity} days Completed</Text>
                          </Space>
                          <div className="order-status-tag">
                            {getStatusTag(item.status)}
                          </div>
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>

      <style jsx>{`

        .orders-card {
          width: 100%;
          max-width: 800px;
          padding:0;
        }

        .orders-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          color: #1f2937;
        }

        .orders-icon {
          font-size: 1.8rem;
           color: #2563eb;
        }

        .orders-tabs .ant-tabs-nav {
          margin-bottom: 1.5rem;
        }

        .order-item {
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease-in-out;
        }
        
        .order-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .ant-list-item-meta {
          flex-direction: row;
          align-items: center;
        }

        .order-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin:0 0.6rem;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;
          margin-bottom: 0.5rem;
        }

        .order-date {
          font-size: 0.8rem;
          font-weight: 500;
          color: #6b7280;
        }

        .order-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .ant-list-item-action {
          margin-left: 0;
        }

        .order-status-tag {
          margin-top: 0.5rem;
        }


        /* Responsive adjustments for screens wider than 576px */
        @media (min-width: 576px) {
          .ant-list-item-meta {
            flex-direction: row;
            align-items: center;
          }

          .order-image {
            width: 120px;
            height: 120px;
          }

          .order-details {
            flex-direction: row;
            gap: 1.5rem;
            align-items: center;
          }
          
          .track-button {
            width: auto;
            align-self: flex-end;
          }
        }
          :where(.css-dev-only-do-not-override-3iyp21).ant-list-vertical .ant-list-item .ant-list-item-meta {
            margin-block-end:0;
          }
          :where(.css-dev-only-do-not-override-3iyp21).ant-card .ant-card-body {
            padding:0 24px;
          }
      `}</style>
    </div>
  );
};

export default Order;
