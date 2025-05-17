// app/dashboard/components/EarningsChart.tsx
"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface EarningsData {
  month: string;
  earnings: number;
}

const EarningsChart: React.FC = () => {
  // Mock data - replace with actual API data
  const earningsData: EarningsData[] = [
    { month: 'Jan', earnings: 400 },
    { month: 'Feb', earnings: 300 },
    { month: 'Mar', earnings: 200 },
    { month: 'Apr', earnings: 278 },
    { month: 'May', earnings: 189 },
    { month: 'Jun', earnings: 239 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Earnings Trend</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={earningsData}>
          <CartesianGrid strokeDasharray="3 3" className="text-gray-200" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#f8f9fa', 
              border: '1px solid #e9ecef',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="earnings" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;