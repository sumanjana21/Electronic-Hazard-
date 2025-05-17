// app/dashboard/components/StatCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  title, 
  value 
}) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <Icon className="text-green-600 mb-2" size={24} />
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);