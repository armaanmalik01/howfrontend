import React from 'react';
import { Card, Typography, Statistic, Row, Col, List, Divider } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RiseOutlined, FallOutlined, DollarCircleOutlined, ShoppingOutlined, UsergroupAddOutlined, TransactionOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;



// Mock data for charts


const COLORS = ['#2563eb', '#9ca3af'];

const Analytics = ({ data }) => {
  console.log(data);

  const earningsChartData = [
    { name: 'Mon', earnings: 100 },
    { name: 'Tue', earnings: 150 },
    { name: 'Wed', earnings: 200 },
    { name: 'Thu', earnings: 180 },
    { name: 'Fri', earnings: 250 },
  ];

  const referralChartData = [
    { name: 'Active', value: data?.referralStats?.activeReferrals },
    { name: 'Pending', value: data?.referralStats?.pendingReferrals },
  ];

  return (
    <div className="analytics-container">
      <Title level={4} style={{ textAlign: 'center', marginBottom: '2rem' }}>Analytics Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} md={12} lg={6}>
          <Card className="analytics-card">
            <Statistic
              title="Wallet Balance"
              value={data?.walletBalance}
              precision={2}
              prefix="₹"
              valueStyle={{ color: '#2563eb' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card className="analytics-card">
            <Statistic
              title="Today's Potential Earnings"
              value={data?.earnings?.todaysPotentialEarnings}
              precision={2}
              prefix="₹"
              valueStyle={{ color: '#2563eb' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card className="analytics-card">
            <Statistic
              title="Active Orders"
              value={data?.earnings?.activeOrdersCount}
              valueStyle={{ color: '#2563eb' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} lg={12}>
          <Card title={<><RiseOutlined /> Earnings Over Time</>} className="chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={<><UsergroupAddOutlined /> Referral Statistics</>} className="chart-card">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={referralChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {referralChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title={<><ShoppingOutlined /> Recent Order</>} className="list-card">
            <List
              itemLayout="horizontal"
              dataSource={data?.recentOrders}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.product}</Text>}
                    description={`Order ID: ${item.id.slice(14)} | Date: ${new Date(item.createdAt).toLocaleString()}`}
                  />
                  <div>Status: <Text type="success">{item.status}</Text></div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<><TransactionOutlined /> Recent Transaction</>} className="list-card">
            <List
              itemLayout="horizontal"
              dataSource={data?.recentTransactions}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong>{item.type}</Text>}
                    description={`Amount: ₹${item.amount} | Date: ${new Date(item.createdAt).toLocaleString()}`}
                  />
                  <div>Status: <Text type="success">{item.status}</Text></div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .analytics-container {
          padding: 1.5rem;
        }
        
        .chart-card .ant-card-head {
          border-bottom: none;
        }
        .list-card .ant-list-item {
          border-bottom: 1px solid #f0f0f0;
        }
        .ant-statistic-title {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Analytics;
