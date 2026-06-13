export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 3 && name.trim().length <= 50;
};

export const validateAddress = (address: string): boolean => {
  return address.trim().length >= 10 && address.trim().length <= 200;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  return `+91${cleaned.slice(-10)}`;
};

export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(0)}`;
};
