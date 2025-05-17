'use client';

import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { EWasteItem } from './page';

interface BuyFormProps {
  item: EWasteItem;
  onClose: () => void;
}

export default function BuyForm({ item, onClose }: BuyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          itemId: item._id,
          totalPrice: item.estimatedPrice * formData.quantity
        })
      });

      if (response.ok) {
        alert('Purchase successful!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Purchase failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('An error occurred during purchase');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="bg-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <ShoppingCart size={24} />
            <h2 className="text-xl font-bold">Purchase {item.brand} {item.model}</h2>
          </div>
          <p className="text-sm text-purple-100 mt-2">Complete your e-waste purchase</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Item Details */}
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{item.brand} {item.model}</p>
              <p className="text-sm text-gray-700">Condition: {item.condition}</p>
            </div>
            <span className="text-xl font-bold text-green-600">
              ${item.estimatedPrice.toFixed(2)}
            </span>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800"
            />
            <textarea
              name="address"
              placeholder="Delivery Address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg text-gray-800"
              rows={3}
            />
          </div>

          {/* Quantity and Total */}
          <div className="flex items-center space-x-4 text-gray-800">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              name="quantity"
              min={1}
              max={5}
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-20 p-2 border border-gray-200 rounded-lg text-center text-gray-800"
            />
            <span className="font-bold">
              Total: ${(item.estimatedPrice * formData.quantity).toFixed(2)}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={20} />
            <span>Complete Purchase</span>
          </button>
        </form>
      </div>
    </div>
  );
}