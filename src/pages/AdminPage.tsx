import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Order, AdminProduct } from '../types';
import { getOrderHistory } from '../utils/storage';
import { products } from '../data/products';
import { formatPrice } from '../utils/validation';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'stats'>('stats');
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedOrders = getOrderHistory();
    setOrders(savedOrders);
  }, []);

  // Calculate Statistics
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter((o) => o.status === 'confirmed').length,
    averageOrderValue: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length) : 0,
    todaySales: orders.filter((o) => {
      const today = new Date();
      const orderDate = new Date(o.createdAt);
      return orderDate.toDateString() === today.toDateString();
    }).length,
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.phone.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">🔧 Admin Dashboard</h1>
          <p className="text-white opacity-90 mt-2">Manage orders, products, and sales</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'stats'
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-dark'
              }`}
            >
              📊 Statistics
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'orders'
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-dark'
              }`}
            >
              📦 Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-4 px-4 font-semibold border-b-2 transition ${
                activeTab === 'products'
                  ? 'text-primary border-primary'
                  : 'text-gray-600 border-transparent hover:text-dark'
              }`}
            >
              🍽️ Products
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold">📈 Sales Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm mb-2">Total Orders</p>
                <p className="text-3xl font-bold text-dark">{stats.totalOrders}</p>
                <p className="text-xs text-gray-500 mt-2">All time</p>
              </div>

              <div className="card bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-dark">{formatPrice(stats.totalRevenue)}</p>
                <p className="text-xs text-gray-500 mt-2">All time</p>
              </div>

              <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm mb-2">Pending Orders</p>
                <p className="text-3xl font-bold text-dark">{stats.pendingOrders}</p>
                <p className="text-xs text-gray-500 mt-2">Awaiting confirmation</p>
              </div>

              <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm mb-2">Avg Order Value</p>
                <p className="text-3xl font-bold text-dark">{formatPrice(stats.averageOrderValue)}</p>
                <p className="text-xs text-gray-500 mt-2">Average amount</p>
              </div>
            </div>

            {/* Charts placeholder */}
            <div className="card">
              <h3 className="text-xl font-bold mb-6">📊 Daily Sales Trend</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">📦 All Orders</h2>
              <div className="flex gap-2 bg-white rounded-lg p-2 border">
                <Search size={20} className="text-gray-600" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="outline-none w-64"
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-2xl text-gray-600">📭 No orders found</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left font-bold text-sm">Order ID</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Customer</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Phone</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Items</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Amount</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Status</th>
                        <th className="px-6 py-4 text-left font-bold text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-bold text-primary">{order.orderNumber}</td>
                          <td className="px-6 py-4">{order.customer.name}</td>
                          <td className="px-6 py-4 text-sm">{order.customer.phone}</td>
                          <td className="px-6 py-4 text-sm">{order.items.length} item(s)</td>
                          <td className="px-6 py-4 font-bold">{formatPrice(order.total)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">🍽️ Product Management</h2>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-secondary transition flex items-center gap-2">
                <Plus size={20} />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="card overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-primary font-bold text-lg">{formatPrice(product.price)}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                        Stock: 50
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-1 text-sm">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-1 text-sm">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
