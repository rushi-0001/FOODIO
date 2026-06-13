import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { Cart as CartType, Product, Order } from './types';
import { addToCart, removeFromCart, updateQuantity, setDeliveryCharge, getCartFromStorage, saveCartToStorage } from './utils/cart';

type PageType = 'home' | 'checkout' | 'admin' | 'success';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [cart, setCart] = useState<CartType>(getCartFromStorage());
  const [showCart, setShowCart] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    const newCart = addToCart(product, 1, cart);
    setCart(newCart);
    
    // Show a brief notification
    showNotification(`${product.name} added to cart!`);
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (productId: string) => {
    const newCart = removeFromCart(productId, cart);
    setCart(newCart);
  };

  // Handle updating quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const newCart = updateQuantity(productId, quantity, cart);
    setCart(newCart);
  };

  // Handle checkout
  const handleCheckout = () => {
    setShowCart(false);
    setCurrentPage('checkout');
  };

  // Handle order success
  const handleOrderSuccess = (order: Order) => {
    setSuccessOrder(order);
    setCart({ items: [], totalItems: 0, subtotal: 0, deliveryCharge: 0, total: 0 });
    setCurrentPage('success');
  };

  // Handle new order
  const handleNewOrder = () => {
    setCurrentPage('home');
    setSuccessOrder(null);
  };

  // Show notification
  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Render pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onAddToCart={handleAddToCart} />;
      case 'checkout':
        return (
          <CheckoutPage
            cart={cart}
            onBack={() => setCurrentPage('home')}
            onOrderSuccess={handleOrderSuccess}
          />
        );
      case 'admin':
        return <AdminPage />;
      case 'success':
        return (
          successOrder && (
            <OrderSuccessPage order={successOrder} onNewOrder={handleNewOrder} />
          )
        );
      default:
        return <HomePage onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        cartCount={cart.totalItems}
        onCartClick={() => setShowCart(true)}
        currentPage={currentPage}
      />

      {/* Cart Drawer */}
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
        />
      )}

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
