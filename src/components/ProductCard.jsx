import React, { useState } from 'react';
import { Card, Typography, Button, message, App } from 'antd';
import { ShoppingOutlined, DollarOutlined, CalendarOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
import axios from "../utils/NetworkManager";


const ProductCard = ({ product }) => {
  const { message } = App.useApp();
  const [loading, set_loading] = useState(false);
  console.log(product)
  const handleOrderClick = async () => {
    set_loading(true);
    try {
      const res = await axios.post("/api/orders", {
        productId: product._id
      })
      message.success("Order Placed !")
    } catch (err) {
      if (err.response) {
        message.error(err.response.data?.message)
      } else {
        message.error(err.message);
      }
    } finally {
      set_loading(false);
    }
  };

  return (
    <Card
      className="product-card"
    >
      <div className="product-content-wrapper">
        <div className="product-image-wrapper">
          <img
            alt={product.productName}
            src={product.productImage}
            className="product-image"
          />
        </div>

        <div className="card-content">
          <Title level={5} className="product-title">{product.productName}</Title>
          <Text className="product-description">{product.productDescription}</Text>

          <div className="price-section">
            <div className="price-item">
              <DollarOutlined style={{ color: '#1890ff' }} />
              <Text className="price-value">₹{product.price}</Text>
            </div>
            <div className="price-item">
              <ThunderboltOutlined style={{ color: '#52c41a' }} />
              <Text className="earning-value">₹{product.perDayEarning} / day</Text>
            </div>
            <div className="price-item">
              <CalendarOutlined style={{ color: '#faad14' }} />
              <Text className="validity-value">{product.productValidity} days</Text>
            </div>
            <div className="price-item">
              <DollarOutlined style={{ color: '#7132f5' }} />
              <Text className="validity-value">{product.productValidity* product.perDayEarning} Total Earn</Text>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            className="order-button"
            icon={<ShoppingOutlined />}
            onClick={handleOrderClick}
            loading={loading}
          >
            Join Now
          </Button>
        </div>
      </div>

      <style jsx>{`  
        .product-card {
          width: 100%;
          max-width: 700px;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease-in-out;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-content-wrapper {
          display: flex;
          flex-direction: column;
        }
        
        .product-image-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 5px;
        }
        
        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-title {
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .product-description {
          display: block;
          color: #4b5563;
          margin-bottom: 1rem;
        }
        
        .price-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .price-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: #1f2937;
        }

        .price-value, .earning-value, .validity-value {
          font-weight: bold;
        }

        .order-button {
          width: 100%;
          border-radius: 0.5rem;
          font-weight: 600;
        }

        
        /* Tablet & Desktop layout: grid */
        @media (min-width: 769px) {
          .product-card {
            width: calc(50% - 1rem);
          }
        }
        
        @media (min-width: 1024px) {
          .product-card {
            width: calc(33.333% - 1.5rem);
          }
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;