import React, { useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import LocationPermission from '../components/LocationPermission';
import { Cart as CartType, Order, Location, CustomerInfo } from '../types';
import { calculateDeliveryCharge, calculateDistance, getDeliveryEstimate } from '../utils/location';
import { saveOrder } from '../utils/storage';
import { formatPrice } from '../utils/validation';

interface CheckoutPageProps {
  cart: CartType;
  onBack: () => void;
  onOrderSuccess: (order: Order) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onBack, onOrderSuccess }) => {
  const [step, setStep] = useState<'location' | 'form' | 'confirm'>('location');
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationDetected = (detectedLocation: Location) => {
    setLocation(detectedLocation);
    setStep('form');
  };

  const handleManualAddressEntry = () => {
    setLocation({
      latitude: 0,
      longitude: 0,
      address: '',
      deliveryDistance: 0,
      isDeliveryAvailable: true,
    });
    setStep('form');
  };

  const handleFormSubmit = async (data: CustomerInfo & { specialInstructions: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const deliveryDistance = location?.latitude && location?.longitude 
        ? calculateDistance(
            location.latitude,
            location.longitude,
            19.076,
            72.877
          )
        : 2;

      if (deliveryDistance > 9) {
        setError('⚠️ Sorry, delivery is not available for this location. Please try another address within 9 KM.');
        setIsLoading(false);
        return;
      }

      const deliveryCharge = calculateDeliveryCharge(deliveryDistance);
      const estimatedTime = getDeliveryEstimate(deliveryDistance);

      const order: Order = {
        id: Date.now().toString(),
        orderNumber: `FD${Date.now().toString().slice(-6)}`,
        customer: data,
        items: cart.items,
        subtotal: cart.subtotal,
        deliveryCharge,
        total: cart.subtotal + deliveryCharge,
        deliveryDistance,
        status: 'confirmed',
        estimatedDeliveryTime: estimatedTime,
        specialInstructions: data.specialInstructions,
        paymentMethod: 'whatsapp',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      saveOrder(order);
      onOrderSuccess(order);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-6 hover:text-secondary transition"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 flex gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-800">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'location' && (
              <div className="animate-fade-in">
                <LocationPermission
                  onLocationDetected={handleLocationDetected}
                  onManualAddressEntry={handleManualAddressEntry}
                />
              </div>
            )}

            {step === 'form' && (
              <div className="animate-fade-in bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">📋 Delivery Information</h2>
                <CheckoutForm
                  onSubmit={handleFormSubmit}
                  lastLocation={location}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">📦 Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-gray-600">x{item.quantity}</p>
                    </div>
                    <p className="font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold">
                    {cart.deliveryCharge > 0 ? formatPrice(cart.deliveryCharge) : 'TBD'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(cart.subtotal + (cart.deliveryCharge || 0))}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-lg p-3 mt-6 text-xs text-blue-800">
                <p className="font-semibold mb-1">💡 Note</p>
                <p>Final delivery charge will be calculated based on your location.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
