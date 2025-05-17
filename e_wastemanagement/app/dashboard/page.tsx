"use client";

import React, { useState } from 'react';
import { 
  Truck, 
  DollarSign, 
  RefreshCw, 
  CreditCard, 
  TrendingUp, 
  Activity,
  Zap,
  MapPin,
  Users,
  Globe,
  ShieldCheck,
  FileText,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

// Expanded Mock Data
const stats = {
  totalPickups: 142,
  totalEarnings: 25720.50,
  pendingPickups: 17,
  completedPickups: 125,
  environmentalImpact: {
    ewasteDiverted: 2750, // in kg
    carbonSaved: 1540, // in kg CO2
    recycledDevices: 356
  }
};

const earningsData = [
  { month: 'Jan', earnings: 400, pickups: 18 },
  { month: 'Feb', earnings: 600, pickups: 22 },
  { month: 'Mar', earnings: 500, pickups: 20 },
  { month: 'Apr', earnings: 780, pickups: 25 },
  { month: 'May', earnings: 650, pickups: 23 },
  { month: 'Jun', earnings: 900, pickups: 34 },
];

const pickups = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'completed',
    items: ['Laptop', 'Mobile Phone'],
    estimatedValue: 250.50,
    location: 'Downtown Office Park'
  },
  {
    id: '2',
    date: '2024-03-20',
    status: 'pending',
    items: ['Desktop Computer', 'Printer'],
    estimatedValue: 350.75,
    location: 'Tech Campus'
  },
  {
    id: '3',
    date: '2024-03-25',
    status: 'completed',
    items: ['Tablet', 'Keyboard'],
    estimatedValue: 180.25,
    location: 'Business District'
  },
  {
    id: '4',
    date: '2024-03-28',
    status: 'pending',
    items: ['Server Rack', 'Network Switch'],
    estimatedValue: 1200.00,
    location: 'Corporate Headquarters'
  }
];

const environmentalImpactData = [
  { category: 'E-Waste Diverted', value: 2750, unit: 'kg' },
  { category: 'Carbon Saved', value: 1540, unit: 'kg CO2' },
  { category: 'Recycled Devices', value: 356, unit: 'Units' }
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              E-Waste Dashboard
            </h1>
            <p className="text-gray-600">
              Sustainable electronics recycling management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
              New Pickup
            </motion.button>
          </div>
        </motion.header>

        {/* Navigation Tabs */}
        <div className="flex mb-6 bg-white rounded-full shadow-md p-1">
          {[          { id: 'overview', label: 'Overview', icon: Globe },
          { id: 'pickups', label: 'Pickups', icon: Truck },
          { id: 'environmental', label: 'Environmental Impact', icon: ShieldCheck }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center px-6 py-2 rounded-full transition-all
              ${activeTab === id 
                ? 'bg-green-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <Icon className="mr-2 w-5 h-5" />
            {label}
          </button>
        ))}
      </div>

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[ 
              { 
                icon: Truck, 
                title: "Total Pickups", 
                value: stats.totalPickups,
                color: "bg-blue-100 text-blue-600"
              },
              { 
                icon: DollarSign, 
                title: "Total Earnings", 
                value: `$${stats.totalEarnings.toFixed(2)}`,
                color: "bg-green-100 text-green-600"
              },
              { 
                icon: RefreshCw, 
                title: "Pending Pickups", 
                value: stats.pendingPickups,
                color: "bg-yellow-100 text-yellow-600"
              },
              { 
                icon: CreditCard, 
                title: "Completed Pickups", 
                value: stats.completedPickups,
                color: "bg-purple-100 text-purple-600"
              }
            ].map(({ icon: Icon, title, value, color }) => (
              <motion.div
                key={title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`${color} p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-xl transition-all`}
              >
                <div>
                  <h3 className="text-sm font-medium mb-2">{title}</h3>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
                <Icon className="w-10 h-10 opacity-70" />
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earnings Chart */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="mr-2 text-green-500" />
                  Earnings Trend
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Zap className="w-4 h-4" />
                  <span>Last 6 Months</span>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
            </motion.div>

            {/* Recent Pickups */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold flex items-center mb-4">
                <Activity className="mr-2 text-blue-500" />
                Recent Pickups
              </h2>
              <div className="space-y-4">
                {pickups.slice(0, 3).map((pickup) => (
                  <motion.div
                    key={pickup.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {pickup.items.join(', ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(pickup.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-700">
                        ${pickup.estimatedValue.toFixed(2)}
                      </span>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-bold 
                          ${pickup.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                          }
                        `}
                      >
                        {pickup.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeTab === 'pickups' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Truck className="mr-3 text-blue-500" /> 
            All Pickups
          </h2>
          <div className="space-y-4">
            {pickups.map((pickup) => (
              <motion.div 
                key={pickup.id}
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <p className="font-semibold text-gray-800">{pickup.location}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {pickup.items.join(', ')}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    ${pickup.estimatedValue.toFixed(2)}
                  </span>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-bold 
                      ${pickup.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                      }
                    `}
                  >
                    {pickup.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'environmental' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ShieldCheck className="mr-3 text-green-500" /> 
            Environmental Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {environmentalImpactData.map((impact) => (
              <motion.div
                key={impact.category}
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 p-6 rounded-2xl text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {impact.value}
                </div>
                <div className="text-sm text-green-800">
                  {impact.category}
                </div>
                <div className="text-xs text-green-600">
                  {impact.unit}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={environmentalImpactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;