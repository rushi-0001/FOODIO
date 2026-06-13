import { Cart, CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'foodio_cart';

export const getCartFromStorage = (): Cart => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : getEmptyCart();
  } catch (error) {
    return getEmptyCart();
  }
};

export const saveCartToStorage = (cart: Cart): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const getEmptyCart = (): Cart => ({
  items: [],
  totalItems: 0,
  subtotal: 0,
  deliveryCharge: 0,
  total: 0,
});

export const addToCart = (product: Product, quantity: number, currentCart: Cart): Cart => {
  const existingItem = currentCart.items.find((item) => item.product.id === product.id);

  let newItems: CartItem[];
  if (existingItem) {
    newItems = currentCart.items.map((item) =>
      item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    newItems = [...currentCart.items, { product, quantity }];
  }

  return updateCartTotals({ ...currentCart, items: newItems });
};

export const removeFromCart = (productId: string, currentCart: Cart): Cart => {
  const newItems = currentCart.items.filter((item) => item.product.id !== productId);
  return updateCartTotals({ ...currentCart, items: newItems });
};

export const updateQuantity = (productId: string, quantity: number, currentCart: Cart): Cart => {
  if (quantity <= 0) {
    return removeFromCart(productId, currentCart);
  }

  const newItems = currentCart.items.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item
  );

  return updateCartTotals({ ...currentCart, items: newItems });
};

export const clearCart = (): Cart => {
  return getEmptyCart();
};

const updateCartTotals = (cart: Cart): Cart => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    ...cart,
    totalItems,
    subtotal,
    total: subtotal + cart.deliveryCharge,
  };
};

export const setDeliveryCharge = (charge: number, currentCart: Cart): Cart => {
  return {
    ...currentCart,
    deliveryCharge: charge,
    total: currentCart.subtotal + charge,
  };
};
