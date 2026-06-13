export const getOrderHistory = (): any[] => {
  try {
    const orders = localStorage.getItem('foodio_orders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    return [];
  }
};

export const saveOrder = (order: any): void => {
  try {
    const orders = getOrderHistory();
    orders.push(order);
    localStorage.setItem('foodio_orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

export const getLastDeliveryLocation = (): any => {
  try {
    const location = localStorage.getItem('foodio_last_location');
    return location ? JSON.parse(location) : null;
  } catch (error) {
    return null;
  }
};

export const saveDeliveryLocation = (location: any): void => {
  try {
    localStorage.setItem('foodio_last_location', JSON.stringify(location));
  } catch (error) {
    console.error('Error saving location:', error);
  }
};
