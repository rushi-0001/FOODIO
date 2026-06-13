import { Location, LocationError } from '../types';

const DELIVERY_RADIUS_KM = 4;
const DELIVERY_EXTENDED_RADIUS_KM = 9;

export const requestUserLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 1,
        message: 'Geolocation is not supported by your browser',
      } as LocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoordinates(latitude, longitude);
        const deliveryDistance = 0; // Will be calculated during checkout

        resolve({
          latitude,
          longitude,
          address,
          deliveryDistance,
          isDeliveryAvailable: true,
        });
      },
      (error) => {
        reject({
          code: error.code,
          message: error.message,
        } as LocationError);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  try {
    // Using Open Street Map Nominatim API (free, no key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    return data.address?.road || data.address?.county || 'Current Location';
  } catch (error) {
    return 'Current Location';
  }
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const isDeliveryAvailable = (distanceKm: number): boolean => {
  return distanceKm <= DELIVERY_EXTENDED_RADIUS_KM;
};

export const calculateDeliveryCharge = (distanceKm: number): number => {
  if (distanceKm <= 2) return 30;
  if (distanceKm <= 4) return 50;
  if (distanceKm <= 6) return 70;
  if (distanceKm <= 9) return 100;
  return 0; // Not deliverable
};

export const getDeliveryEstimate = (distanceKm: number): number => {
  // Base time 20 minutes + 2 minutes per km
  return Math.ceil(20 + distanceKm * 2);
};
