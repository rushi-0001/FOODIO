import React from 'react';
import { Check, Copy, Heart } from 'lucide-react';
import { Order } from '../types';
import { formatPrice } from '../utils/validation';
import { generateWhatsAppMessage, sendOrderViaWhatsApp } from '../utils/whatsapp';

interface OrderConfirmationProps {
  order: Order;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onNewOrder }) => {
  const [copied, setCopied] = React.useState(false);
  const whatsappMessage = generateWhatsAppMessage(order);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareOnWhatsApp = () => {
    sendOrderViaWhatsApp(whatsappMessage);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Success Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <Check size={40} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-dark mb-2">🎉 Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully</p>

        {/* Order Number */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-primary">{order.orderNumber}</span>
            <button
              onClick={handleCopyOrderNumber}
              className="p-2 hover:bg-gray-200 rounded transition"
              title="Copy order number"
            >
              <Copy size={20} className={copied ? 'text-green-600' : 'text-gray-600'} />
            </button>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">⏱️ Estimated Delivery</p>
            <p className="text-xl font-bold text-dark">{order.estimatedDeliveryTime} min</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">📍 Distance</p>
            <p className="text-xl font-bold text-dark">{order.deliveryDistance.toFixed(2)} KM</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">💰 Total Amount</p>
            <p className="text-xl font-bold text-primary">{formatPrice(order.total)}</p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">📦 Order Details</h2>

        {/* Items */}
        <div className="space-y-3 mb-6 pb-6 border-b">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-sm text-gray-600">x{item.quantity}</p>
              </div>
              <span className="font-bold">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Charge</span>
            <span>{formatPrice(order.deliveryCharge)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">🏠 Delivery Address</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="font-semibold">{order.customer.name}</p>
          <p className="text-gray-600 mt-2">{order.customer.address}</p>
          <p className="text-sm text-gray-600 mt-2">📞 {order.customer.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleShareOnWhatsApp}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          💬 Share on WhatsApp
        </button>
        <button
          onClick={onNewOrder}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition"
        >
          🍕 Place Another Order
        </button>
      </div>

      {/* Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 text-center">
        <p className="text-sm text-gray-700">
          💡 Order confirmation will be sent to <strong>+91 7841967288</strong> on WhatsApp
        </p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
