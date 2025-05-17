"use client";

import { useState, useEffect } from "react";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  DollarSign, 
  Loader,
  Sparkles,
  Recycle,
  ChevronDown
} from "lucide-react";

export default function EstimatePage() {
  const [price, setPrice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceType, setDeviceType] = useState("Smartphone");
  const [condition, setCondition] = useState("Good");
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (price) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrice(null);

    // Simulating API call with realistic pricing based on device and condition
    setTimeout(() => {
      const baseValues = {
        Smartphone: 120,
        Laptop: 250,
        Tablet: 150,
      };
      
      const conditionMultipliers = {
        "Like New": 1.0,
        "Good": 0.7,
        "Broken": 0.3,
      };
      
      const baseValue = baseValues[deviceType as keyof typeof baseValues];
      const multiplier = conditionMultipliers[condition as keyof typeof conditionMultipliers];
      const calculatedPrice = Math.floor(baseValue * multiplier);
      
      // Add some randomness (±10%)
      const variance = calculatedPrice * 0.1;
      const finalPrice = calculatedPrice + Math.floor(Math.random() * variance * 2 - variance);
      
      setPrice("$" + finalPrice);
      setIsLoading(false);
    }, 1500);
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case "Smartphone":
        return <Smartphone className="text-blue-500" size={24} />;
      case "Laptop":
        return <Laptop className="text-purple-500" size={24} />;
      case "Tablet":
        return <Tablet className="text-teal-500" size={24} />;
      default:
        return <Smartphone className="text-blue-500" size={24} />;
    }
  };

  const getConditionColor = () => {
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div 
        className={`w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-700 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
        }`}
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full -ml-12 -mb-12 opacity-50"></div>
        
        {/* Header with Animation */}
        <div className="relative bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white" 
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s linear infinite`
                }}
              ></div>
            ))}
          </div>
          
          <div className="flex items-center mb-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
              <Recycle size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">E-Waste Value Estimator</h1>
          </div>
          <p className="text-sm text-white text-opacity-90">
            Transform your old devices into cash. Easy, fast, and eco-friendly.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="p-6 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Device Type Selection */}
            <div className="transition-all duration-300 hover:transform hover:scale-105">
              <label className="text-sm font-medium mb-2 text-gray-700 flex items-center">
                <span>Device Type</span>
                <span className="ml-2 text-xs text-gray-500">Select your device</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {getDeviceIcon()}
                </div>
                <select 
                  className="w-full pl-10 p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-green-300 transition-colors appearance-none text-gray-900 font-medium"
                  disabled={isLoading}
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                >
                  <option className="text-gray-900 font-medium">Smartphone</option>
                  <option className="text-gray-900 font-medium">Laptop</option>
                  <option className="text-gray-900 font-medium">Tablet</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Condition Selection */}
            <div className="transition-all duration-300 hover:transform hover:scale-105">
              <label className="text-sm font-medium mb-2 text-gray-700 flex items-center">
                <span>Condition</span>
                <span className="ml-2 text-xs text-gray-500">How well does it work?</span>
              </label>
              <div className="relative">
                <select 
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-green-300 transition-colors appearance-none text-gray-900 font-medium"
                  disabled={isLoading}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option className="text-gray-900 font-medium">Like New</option>
                  <option className="text-gray-900 font-medium">Good</option>
                  <option className="text-gray-900 font-medium">Broken</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>
              
              <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium border ${getConditionColor()} transition-all duration-300`}>
                {condition}
              </div>
            </div>
            
            {/* Submit Button with Animation */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Calculating Estimate...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Estimate Price
                </span>
              )}
            </button>
            
            {/* Confetti Animation */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0'][Math.floor(Math.random() * 4)],
                      borderRadius: '50%',
                      animation: `confetti ${Math.random() * 2 + 1}s ease-out forwards`
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Price Display with Animation */}
            {price && (
              <div 
                className={`mt-4 p-6 rounded-xl text-center shadow-lg border border-green-100 transition-all duration-700 ${
                  price ? "opacity-100 transform scale-100" : "opacity-0 transform scale-95"
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(236,252,235,1) 0%, rgba(230,249,250,1) 100%)'
                }}
              >
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full shadow-md border border-green-100">
                    <Sparkles size={24} className="text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-sm text-gray-600 mb-1">Estimated Value</h3>
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-600 my-2">
                  {price}
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Based on current market rates for {deviceType}s in {condition} condition
                </p>
              </div>
            )}
          </form>
          
          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              Estimates are approximate and may vary based on actual condition assessment
            </p>
          </div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
        }
        
        /* Make the dropdown text darker */
        select option {
          color: #111827;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}