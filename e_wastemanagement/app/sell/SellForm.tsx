'use client';

import { useState } from 'react';
import { 
  useCreateSellItemMutation, 
  useUpdateSellItemMutation,
  EWasteItem 
} from './../_api_query/sellApi';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Gamepad,
  Monitor,
  Loader,
  Recycle,
  X,
  Cable,
  IndianRupee // Replacing DollarSign with IndianRupee
} from "lucide-react";

interface SellFormProps {
  initialData?: EWasteItem | null;
  onClose?: () => void;
}

export default function SellForm({ initialData, onClose }: SellFormProps) {
  const [createSellItem, { isLoading: isCreating }] = useCreateSellItemMutation();
  const [updateSellItem, { isLoading: isUpdating }] = useUpdateSellItemMutation();

  const [deviceType, setDeviceType] = useState(initialData?.deviceType || "smartphone");
  const [condition, setCondition] = useState(initialData?.condition || "good");
  const [formData, setFormData] = useState({
    brand: initialData?.brand || '',
    model: initialData?.model || '',
    weight: initialData?.weight ? initialData.weight.toString() : '',
    images: initialData?.images || []
  });
  const [price, setPrice] = useState<string | null>(initialData?.estimatedPrice ? `₹${initialData.estimatedPrice.toFixed(2)}` : null);

  // Enhanced device type configuration
  const deviceTypes = [
    {
      type: "smartphone",
      icon: Smartphone,
      label: "Smartphone",
      description: "Mobile phones, iPhones, Android devices"
    },
    {
      type: "laptop",
      icon: Laptop,
      label: "Laptop",
      description: "Portable computers, MacBooks, Windows laptops"
    },
    {
      type: "tablet",
      icon: Tablet,
      label: "Tablet",
      description: "iPad, Android tablets, Surface devices"
    },
    {
      type: "gaming",
      icon: Gamepad,
      label: "Gaming Device",
      description: "Gaming consoles, high-end gaming PCs"
    },
    {
      type: "monitor",
      icon: Monitor,
      label: "Monitor",
      description: "Displays, screens, LCD/LED panels"
    },
    {
      type: "electrical-wire",
      icon: Cable,
      label: "Electrical Wire",
      description: "Cables, wires, electrical scrap"
    }
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...filesArray]
      }));
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      deviceType,
      condition,
      brand: formData.brand,
      model: formData.model,
      weight: parseFloat(formData.weight),
      images: formData.images
    };

    try {
      let result;
      if (initialData?._id) {
        result = await updateSellItem({ 
          id: initialData._id, 
          updatedItem: submitData 
        }).unwrap();
      } else {
        result = await createSellItem(submitData).unwrap();
      }

      setPrice(`₹${result.estimatedPrice.toFixed(2)}`);
      
      if (onClose) onClose();
    } catch (err) {
      console.error('Failed to submit item', err);
      alert('Failed to submit item. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      onClick={(e) => {
        // Close the form if clicking outside the form
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div 
        className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 bg-white/80 rounded-full p-2 shadow-md"
          aria-label="Close Form"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              {initialData?._id ? 'Edit' : 'Add'} E-Waste Item
              <Recycle className="ml-3 text-green-600" />
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Device Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {deviceTypes.map(({ type, icon: Icon, label, description }) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setDeviceType(type as any)}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center text-center transition duration-300 ${
                      deviceType === type 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-8 h-8 mb-2" />
                    <span className="text-xs font-semibold">{label}</span>
                    <span className="text-[10px] text-opacity-70 hidden md:block">{description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['new', 'good', 'fair', 'poor'].map((conditionType) => (
                  <button
                    type="button"
                    key={conditionType}
                    onClick={() => setCondition(conditionType as any)}
                    className={`p-3 rounded-lg capitalize transition duration-300 ${
                      condition === conditionType 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {conditionType}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand and Model Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter brand"
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleFormChange}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter model"
                />
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                Weight (grams)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleFormChange}
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter device weight"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-green-700 hover:file:bg-green-100"
              />
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Upload preview ${index + 1}`} 
                        className="w-full h-20 object-cover rounded-lg" 
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
            >
              {isCreating || isUpdating ? (
                <div className="flex items-center justify-center">
                  <Loader className="mr-2 animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit Item'
              )}
            </button>

            {/* Price Display */}
            {price && (
              <div className="mt-4 text-center bg-green-50 p-3 rounded-lg">
                <p className="text-xl font-bold text-green-600 flex items-center justify-center">
                  <IndianRupee className="mr-2" /> Estimated Price: {price}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}