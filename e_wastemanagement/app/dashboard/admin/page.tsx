'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UsersIcon, 
  DollarSignIcon, 
  TruckIcon, 
  TagIcon, 
  StarIcon, 
  GlobeIcon,
  MenuIcon,
  HomeIcon,
  XIcon,
  PlusIcon,
  EditIcon,
  TrashIcon
} from 'lucide-react';

import CouponManagementPage from '../../coupon/page'; 

// Redux Toolkit Query Imports
import { 
  useGetCouponsQuery, 
  useCreateCouponMutation, 
  useUpdateCouponMutation, 
  useDeleteCouponMutation 
} from '../../_api_query/couponApi';

// Interfaces
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  department?: string;
  lastLogin?: Date;
}

interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

interface Pickup {
  _id: string;
  userId: string;
  address: string;
  date: Date;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface Coupon {
  _id?: string;
  code: string;
  discountType: string;
  discountValue: number;
  expirationDate: Date;
  usageLimit?: number;
  currentUsageCount?: number;
  status: 'active' | 'disabled';
  createdBy: string;
}

interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}

export default function AdminDashboard() {
  // State Management
  const [activeSection, setActiveSection] = useState<'users' | 'transactions' | 'pickups' | 'coupons' | 'reviews' | 'multilingual'>('users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Coupon Management States
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Partial<Coupon>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Redux Toolkit Query Hooks
  const { data: coupons = [], isLoading: isCouponsLoading } = useGetCouponsQuery();
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  // Placeholder data (would be replaced with actual API calls)
  const [users] = useState<User[]>([
    { 
      _id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'user', 
      isActive: true,
      department: 'Sales',
      lastLogin: new Date()
    },
    { 
      _id: '2', 
      name: 'Admin User', 
      email: 'admin@example.com', 
      role: 'admin', 
      isActive: true,
      department: 'IT',
      lastLogin: new Date()
    }
  ]);

  // Render Sections
  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-gray-600">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Role</th>
                      <th className="p-3 text-left">Department</th>
                      <th className="p-3 text-left">Last Login</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${user.role === 'admin' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}
                          `}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-3">{user.department}</td>
                        <td className="p-3">{user.lastLogin?.toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${user.isActive ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
                          `}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      
        case 'coupons':
          // Render the existing CouponManagementPage
          return <CouponManagementPage />;
          
      // Other sections remain similar to previous implementation
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar and Main Content remain similar to previous implementation */}
      <div className="fixed md:relative z-40 w-64 bg-gray-900 text-gray-200 h-full shadow-2xl">
        {/* Sidebar content */}
        <nav className="p-4">
          {[
            { icon: <UsersIcon />, label: 'Users', section: 'users' },
            { icon: <TagIcon />, label: 'Coupons', section: 'coupons' },
            // Other navigation items
          ].map(item => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.section as any)}
              className={`
                w-full text-left p-3 rounded flex items-center space-x-3 mb-2
                ${activeSection === item.section 
                  ? 'bg-blue-700 text-white' 
                  : 'hover:bg-gray-800 text-gray-400'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}