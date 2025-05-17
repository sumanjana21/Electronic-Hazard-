'use client';

import { useState, useEffect } from 'react';
import BuyForm from './buyForm';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  ShoppingCart,
  Tag,
} from "lucide-react";

export interface EWasteItem {
  _id: string;
  deviceType: string;
  brand: string;
  model: string;
  condition: string;
  estimatedPrice: number;
  weight: number;
  images: string[];
  createdAt: Date;
}

export default function BuyPage() {
  const [items, setItems] = useState<EWasteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceTypeFilter, setDeviceTypeFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<EWasteItem | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  const fetchEWasteItems = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        deviceType: deviceTypeFilter === "All" ? "" : deviceTypeFilter,
        condition: conditionFilter === "All" ? "" : conditionFilter,
        minPrice: priceRange.min.toString(),
        maxPrice: priceRange.max.toString(),
        search: searchTerm,
        page: pagination.page.toString(),
        limit: "12"
      });

      const response = await fetch(`/api/buy?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch e-waste items');
      }

      const data = await response.json();
      setItems(data.items);
      setPagination({
        page: data.page,
        totalPages: data.totalPages,
        total: data.total
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEWasteItems();
  }, [deviceTypeFilter, conditionFilter, priceRange, searchTerm, pagination.page]);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "Smartphone":
        return <Smartphone className="text-blue-500" size={48} />;
      case "Laptop":
        return <Laptop className="text-purple-500" size={48} />;
      case "Tablet":
        return <Tablet className="text-teal-500" size={48} />;
      default:
        return <Smartphone className="text-blue-500" size={48} />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Like New":
        return "bg-green-100 text-green-800 border-green-200";
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Broken":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleBuyClick = (item: EWasteItem) => {
    setSelectedItem(item);
  };

  const handleCloseBuyForm = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center mb-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
              <ShoppingCart size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">Buy Refurbished E-Waste</h1>
          </div>
          <p className="text-sm text-white text-opacity-90">
            Find affordable, eco-friendly electronic devices. Help reduce e-waste!
          </p>
        </div>

        {/* Filters Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Device Type Filter */}
            <div className="relative">
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm appearance-none text-gray-800 font-medium"
                value={deviceTypeFilter}
                onChange={(e) => setDeviceTypeFilter(e.target.value)}
              >
                <option value="All">All Devices</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Tablet">Tablet</option>
              </select>
            </div>

            {/* Condition Filter */}
            <div className="relative">
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm appearance-none text-gray-800 font-medium"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                <option value="All">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Broken">Broken</option>
              </select>
            </div>

            {/* Price Range Filters */}
            <div className="relative">
              <input
                type="number"
                placeholder="Min Price"
                className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm text-gray-800"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({...prev, min: Number(e.target.value)}))}
                min={0}
                max={1000}
              />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max Price"
                className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm text-gray-800"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({...prev, max: Number(e.target.value)}))}
                min={0}
                max={1000}
              />
            </div>

            {/* Search Input */}
            <div className="col-span-full relative">
              <input
                type="text"
                placeholder="Search by brand, model, device type, or condition"
                className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Items Grid */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-700 text-xl">Loading devices...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-700 text-xl">No devices found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {items.map((item) => (
                  <div 
                    key={item._id} 
                    className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:scale-105"
                  >
                    {/* Device Image Placeholder */}
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                      {getDeviceIcon(item.deviceType)}
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{item.brand} {item.model}</h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}
                        >
                          {item.condition}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Tag size={16} className="text-green-500 mr-2" />
                          <span className="text-xl font-bold text-green-600">
                            ${item.estimatedPrice.toFixed(2)}
                          </span>
                        </div>
                        <button 
                          className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                          onClick={() => handleBuyClick(item)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-4 mt-6">
                <button 
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition-colors"
                >
                  Previous
                </button>
                
                <span className="text-gray-700">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                
                <button 
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page === pagination.totalPages}
                  className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>

        {/* Buy Form Modal */}
        {selectedItem && (
          <BuyForm 
            item={selectedItem} 
            onClose={handleCloseBuyForm} 
          />
        )}
      </div>
    </div>
  );
}