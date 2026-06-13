import React from 'react';
import OrderConfirmation from '../components/OrderConfirmation';
import { Order } from '../types';

interface OrderSuccessPageProps {
  order: Order;
  onNewOrder: () => void;
}

const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onNewOrder }) => {
  return (
    <div className="min-h-screen bg-light py-8">
      <OrderConfirmation order={order} onNewOrder={onNewOrder} />
    </div>
  );
};

export default OrderSuccessPage;
