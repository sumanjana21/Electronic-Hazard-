'use client';

import { useState } from 'react';
import { 
  useGetUserSellItemsQuery, 
  useDeleteSellItemMutation,
  EWasteItem 
} from './../_api_query/sellApi';
import SellForm from './SellForm';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Info,
  X,
  IndianRupee 
} from 'lucide-react';

export default function SellPage() {
  const { data: sellItems, isLoading, error } = useGetUserSellItemsQuery();
  const [deleteSellItem] = useDeleteSellItemMutation();
  const [selectedItem, setSelectedItem] = useState<EWasteItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteSellItem(id).unwrap();
      } catch (err) {
        console.error('Failed to delete item', err);
        alert('Failed to delete item');
      }
    }
  };

  const handleEdit = (item: EWasteItem) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const renderStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      listed: 'bg-green-100 text-green-800',
      sold: 'bg-blue-100 text-blue-800',
      removed: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <IndianRupee className="mr-4 text-green-600 w-10 h-10" />
            My E-Waste Sales
          </h1>
          <button 
            onClick={() => {
              setSelectedItem(null);
              setIsFormOpen(true);
            }}
            className="flex items-center bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Plus className="mr-2 w-5 h-5" /> Add New Item
          </button>
        </div>

        {/* Sell Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-green-50/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 z-60 text-gray-500 hover:text-gray-800 bg-white/80 rounded-full p-2 shadow-md"
                >
                  <X className="w-6 h-6" />
                </button>
                <SellForm 
                  initialData={selectedItem} 
                  onClose={() => setIsFormOpen(false)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Items List */}
        {isLoading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Info className="mx-auto mb-4 text-blue-500 w-12 h-12" />
            <p className="text-xl text-gray-600">Loading your e-waste items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl shadow-md">
            <p className="text-xl text-red-600">Failed to load items. Please try again.</p>
          </div>
        ) : sellItems?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Info className="mx-auto mb-4 text-gray-500 w-12 h-12" />
            <p className="text-xl text-gray-600">You haven't listed any e-waste items yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellItems?.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2"
              >
                {/* Item Image or Placeholder */}
                <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      src={item.images[0]} 
                      alt={`${item.brand} ${item.model}`} 
                      className="w-full h-full object-cover transition duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="text-gray-400 text-lg">No Image</div>
                  )}
                </div>

                {/* Item Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{item.brand} {item.model}</h3>
                      <p className="text-sm text-gray-500 capitalize">{item.deviceType}</p>
                    </div>
                    {renderStatusBadge(item.status)}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{item.estimatedPrice.toFixed(2)}
                    </p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full transition duration-300 hover:scale-110"
                      >
                        <Edit size={24} />
                      </button>
                      <button 
                        onClick={() => item._id && handleDelete(item._id)}
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