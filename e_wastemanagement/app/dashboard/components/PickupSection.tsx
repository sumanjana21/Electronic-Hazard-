// app/dashboard/components/PickupSection.tsx
import React from 'react';
import { Truck, CheckCircle, Clock } from 'lucide-react';

interface Pickup {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  items: string[];
  estimatedValue: number;
}

interface PickupSectionProps {
  pickups: Pickup[];
}

const PickupSection: React.FC<PickupSectionProps> = ({ pickups }) => {
  const getStatusIcon = (status: Pickup['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="text-green-500" />;
      case 'cancelled':
        return <Truck className="text-red-500" />;
    }
  };

  const getStatusColor = (status: Pickup['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'completed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Pickups</h2>
        <Truck className="text-gray-400" />
      </div>

      {pickups.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No pickups found
        </div>
      ) : (
        <div className="space-y-4">
          {pickups.map((pickup) => (
            <div 
              key={pickup.id} 
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(pickup.status)}
                <div>
                  <p className="font-medium">
                    {pickup.items.join(', ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(pickup.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-700">
                  ${pickup.estimatedValue.toFixed(2)}
                </span>
                <span 
                  className={`
                    px-3 py-1 rounded-full text-xs font-bold 
                    ${getStatusColor(pickup.status)}
                    bg-opacity-10 
                    ${
                      pickup.status === 'pending' 
                        ? 'bg-yellow-500' 
                        : pickup.status === 'completed' 
                        ? 'bg-green-500' 
                        : 'bg-red-500'
                    }
                  `}
                >
                  {pickup.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PickupSection;