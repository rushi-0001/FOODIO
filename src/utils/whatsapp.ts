import { Order, CartItem } from '../types';

const WHATSAPP_NUMBER = '+917841967288';

export const generateWhatsAppMessage = (order: Order): string => {
  const itemsList = order.items
    .map((item: CartItem) => `• ${item.product.name} x${item.quantity} - ₹${item.product.price * item.quantity}`)
    .join('\n');

  const message = `🍕 *FOODIO ORDER CONFIRMATION* 🍕

*Customer Details:*
👤 Name: ${order.customer.name}
📱 Mobile: ${order.customer.phone}
📍 Address: ${order.customer.address}

*📦 Order Items:*
${itemsList}

*💰 Order Summary:*
 Subtotal: ₹${order.subtotal}
 Delivery Charge: ₹${order.deliveryCharge}
━━━━━━━━━━━━━━━━━━
 Total: ₹${order.total}

*📊 Delivery Details:*
 Distance: ${order.deliveryDistance.toFixed(2)} KM
⏱️ Estimated Time: ${order.estimatedDeliveryTime} minutes

*📝 Special Instructions:*
${order.specialInstructions || 'None'}

━━━━━━━━━━━━━━━━━━
Thank you for ordering with Foodio! 🙏`;

  return message;
};

export const sendOrderViaWhatsApp = (message: string): void => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const getWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
