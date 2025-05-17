'use client';

import { useState } from 'react';
import { 
  useGetCouponsQuery, 
  useDeleteCouponMutation,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  Coupon 
} from './../_api_query/couponApi';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Info,
  X,
  Tag 
} from 'lucide-react';

export default function CouponManagementPage() {
  const { data: couponsData, isLoading, error } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Ensure coupons is always an array
  const coupons = couponsData || [];

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id).unwrap();
      } catch (err) {
        console.error('Failed to delete coupon', err);
        alert('Failed to delete coupon');
      }
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsFormOpen(true);
  };

  const renderStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      disabled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <Tag className="mr-4 text-purple-600 w-10 h-10" />
            Coupon Management
          </h1>
          <button 
            onClick={() => {
              setSelectedCoupon(null);
              setIsFormOpen(true);
            }}
            className="flex items-center bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="mr-2 w-5 h-5" /> Create Coupon
          </button>
        </div>

        {/* Coupon Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-purple-50/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 z-60 text-gray-500 hover:text-gray-800 bg-white/80 rounded-full p-2 shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
                <CouponForm 
                  initialData={selectedCoupon} 
                  onClose={() => setIsFormOpen(false)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Coupons List */}
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Info className="mx-auto mb-4 text-blue-500 w-12 h-12" />
            <p className="text-xl text-gray-600">Loading coupons...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl shadow-md">
            <p className="text-xl text-red-600">Failed to load coupons. Please try again.</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Info className="mx-auto mb-4 text-gray-500 w-12 h-12" />
            <p className="text-xl text-gray-600">No coupons created yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coupons.map((coupon) => (
              <div 
                key={coupon._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{coupon.code}</h3>
                      <p className="text-sm text-gray-500 capitalize">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% Off` 
                          : `₹${coupon.discountValue} Off`}
                      </p>
                    </div>
                    {renderStatusBadge(coupon.status)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Usage:</strong> {coupon.currentUsageCount} / {coupon.usageLimit}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Expires:</strong> {formatDate(coupon.expirationDate)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(coupon)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition duration-300 hover:scale-110"
                      >
                        <Edit size={24} />
                      </button>
                      <button 
                        onClick={() => coupon._id && handleDelete(coupon._id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition duration-300 hover:scale-110"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Coupon Form Component
function CouponForm({ 
  initialData, 
  onClose 
}: { 
  initialData?: Coupon | null, 
  onClose: () => void 
}) {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    discountType: initialData?.discountType || 'percentage',
    discountValue: initialData?.discountValue || 0,
    expiryDate: initialData 
      ? new Date(initialData.expirationDate).toISOString().split('T')[0] 
      : '',
    maxUsageLimit: initialData?.usageLimit || 0,
    isActive: initialData?.status === 'active'
  });

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        // Update existing coupon
        await updateCoupon({ 
          id: initialData._id, 
          updatedCoupon: {
            ...formData,
            status: formData.isActive ? 'active' : 'disabled',
            expirationDate: new Date(formData.expiryDate),
            usageLimit: formData.maxUsageLimit
          }
        }).unwrap();
      } else {
        // Create new coupon
        await createCoupon({
          ...formData,
          status: formData.isActive ? 'active' : 'disabled',
          expirationDate: new Date(formData.expiryDate),
          usageLimit: formData.maxUsageLimit,
          // createdBy: 'admin' // You might want to dynamically set this
        }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save coupon', error);
      alert('Failed to save coupon');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initialData ? 'Edit Coupon' : 'Create New Coupon'}
      </h2>
      
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Coupon Code
        </label>
        <input
          type="text"
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({...formData, code: e.target.value})}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
            Discount Type
          </label>
          <select
            id="discountType"
            value={formData.discountType}
            onChange={(e) => setFormData({...formData, discountType: e.target.value as 'percentage' | 'fixed'})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        <div>
          <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
            Discount Value
          </label>
          <input
            type="number"
            id="discountValue"
            value={formData.discountValue}
            onChange={(e) => setFormData({...formData, discountValue: Number(e.target.value)})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="maxUsageLimit" className="block text-sm font-medium text-gray-700">
            Max Usage Limit
          </label>
          <input
            type="number"
            id="maxUsageLimit"
            value={formData.maxUsageLimit}
            onChange={(e) => setFormData({...formData, maxUsageLimit: Number(e.target.value)})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
          Active Coupon
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button 
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
        >
          {initialData ? 'Update Coupon' : 'Create Coupon'}
        </button>
      </div>
    </form>
  );
}