import React, { useState } from 'react';
import { Card, Typography, List, Tag, Tabs, Space } from 'antd';
import { TeamOutlined, UserOutlined, UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const getStatusTag = (hasPlacedOrder) => {
  if (hasPlacedOrder) {
    return <Tag icon={<CheckCircleOutlined />} color="success">Valid</Tag>;
  } else {
    return <Tag icon={<CloseCircleOutlined />} color="error">Invalid</Tag>;
  }
};

const Team = () => {
  const [activeTab, setActiveTab] = useState('valid');

  const { data } = useLoaderData();
  

  // Filter users based on whether they have placed an order
  const validUsers = data?.referredUsers.filter(user => user.hasPlacedFirstOrder);
  const invalidUsers = data?.referredUsers.filter(user => !user.hasPlacedFirstOrder);

  console.log(data);

  return (
    <div className="team-container">
      <Card className="team-card">
        <Title level={4} className="team-title">
          <TeamOutlined className="team-icon" /> My Team
        </Title>

        <Tabs activeKey={activeTab} onChange={setActiveTab} centered className="team-tabs">
          <TabPane tab="Valid Users" key="valid">
            <List
              dataSource={validUsers}
              renderItem={item => (
                <List.Item className="user-item">
                  <List.Item.Meta
                    avatar={<UserOutlined className="user-avatar" />}
                    title={
                      <div className="user-header">
                        <Text strong>{item.fullName}</Text>
                        {getStatusTag(item.hasPlacedFirstOrder)}
                      </div>
                    }
                    description={
                      <div className="user-details">
                        <Text type="secondary">Joined: {new Date(item.createdAt).toDateString()}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Invalid Users" key="invalid">
            <List
              dataSource={invalidUsers}
              renderItem={item => (
                <List.Item className="user-item">
                  <List.Item.Meta
                    avatar={<UserOutlined className="user-avatar" />}
                    title={
                      <div className="user-header">
                        <Text strong>{item.fullName}</Text>
                        {getStatusTag(item.hasPlacedFirstOrder)}
                      </div>
                    }
                    description={
                      <div className="user-details">
                        <Text type="secondary">Joined: {new Date(item.createdAt).toDateString()}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>

      <style jsx>{`
        .team-container {
          display: flex;
          justify-content: center;
          background-color: #f3f4f6;
        }

        .team-card {
          width: 100%;
          max-width: 800px;
        }

        .team-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-weight: 700;
          color: #1f2937;
        }

        .team-icon {
          font-size: 1.8rem;
          color: #2563eb;
        }

        .team-tabs .ant-tabs-nav {
          margin-bottom: 2rem;
        }

        .user-item {
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease-in-out;
          display: flex;
          align-items: center;
        }

        .user-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .user-avatar {
          background-color: #e5e7eb;
          color: #6b7280;
          font-size: 2rem;
          padding: 0.5rem;
          margin:0.5rem;
          border-radius: 50%;
        }

        .user-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        @media (min-width: 576px) {
          .user-details {
            flex-direction: row;
            gap: 1.5rem;
            align-items: center;
          }
        }

        :where(.css-dev-only-do-not-override-3iyp21).ant-card .ant-card-body {
          padding:0 24px;
        }
      `}</style>
    </div>
  );
};

export default Team;
