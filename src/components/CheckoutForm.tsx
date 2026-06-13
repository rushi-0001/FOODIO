import React from 'react';
import { MapPin, Phone, Mail, FileText } from 'lucide-react';
import { CustomerInfo } from '../types';
import { validateName, validatePhone, validateAddress } from '../utils/validation';

interface CheckoutFormProps {
  onSubmit: (data: CustomerInfo & { specialInstructions: string }) => void;
  lastLocation?: any;
  isLoading?: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  lastLocation,
  isLoading = false,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: lastLocation?.address || '',
    latitude: lastLocation?.latitude || 0,
    longitude: lastLocation?.longitude || 0,
    specialInstructions: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be 3-50 characters';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    if (!validateAddress(formData.address)) {
      newErrors.address = 'Address must be 10-200 characters';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold mb-2 flex items-center gap-2">
            <Phone size={16} /> Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          <Mail size={16} /> Email (Optional)
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          <MapPin size={16} /> Delivery Address *
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your complete delivery address"
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          <FileText size={16} /> Special Instructions (Optional)
        </label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          placeholder="Any special instructions? e.g., Ring the bell twice..."
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
  );
};

export default CheckoutForm;
