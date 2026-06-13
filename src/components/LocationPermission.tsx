import React from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { Location, LocationError } from '../types';
import { requestUserLocation } from '../utils/location';

interface LocationPermissionProps {
  onLocationDetected: (location: Location) => void;
  onManualAddressEntry: () => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({
  onLocationDetected,
  onManualAddressEntry,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRequestLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const location = await requestUserLocation();
      onLocationDetected(location);
    } catch (err: any) {
      setError(err.message || 'Failed to get your location');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
      <div className="flex items-start gap-4">
        <MapPin size={24} className="flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">📍 Delivery Location</h2>
          <p className="text-sm mb-4 opacity-90">
            We deliver within 4 KM radius. Please share your location to check delivery availability.
          </p>
          
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded p-3 mb-4 flex gap-2">
              <AlertCircle size={18} className="flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRequestLocation}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-white text-primary px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50"
            >
              <Navigation size={18} />
              {loading ? 'Detecting...' : 'Use My Location'}
            </button>
            <button
              onClick={onManualAddressEntry}
              className="px-6 py-2 rounded-lg font-bold border-2 border-white hover:bg-white hover:bg-opacity-20 transition"
            >
              📍 Enter Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPermission;
