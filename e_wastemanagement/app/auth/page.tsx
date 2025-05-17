"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Recycle, LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const bodyData = isLogin ? { email: formData.email, password: formData.password } : formData;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
        credentials: "include",  // ✅ Ensures cookies are sent & stored properly
      
      
      });
  
      const data = await response.json();
  
      if (!data.success) {
        setError(data.message || "Authentication failed");
        setLoading(false);
        return;
      }
  
      // No need to set cookies manually here, the API response handles it
      
      // Can still store in localStorage for non-sensitive operations if needed
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
  
      // Navigate to dashboard
      router.replace("/dashboard");
    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
      {/* Nature-inspired decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200 rounded-tr-full opacity-20"></div>
      
      <div className="relative w-full max-w-md">
        {/* Floating recycling icons */}
        <div className="absolute -top-8 -left-8 text-green-300 opacity-30">
          <Recycle size={64} />
        </div>
        <div className="absolute -bottom-8 -right-8 text-teal-300 opacity-30">
          <Leaf size={64} />
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-100 relative overflow-hidden">
          {/* Subtle wave pattern background */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-50 to-transparent opacity-50 z-0"></div>
          
          <div className="text-center mb-8 relative z-10">
            <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-md">
              <Recycle className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              {isLogin ? "Welcome to EcoWaste" : "Join EcoWaste Today"}
            </h2>
            <p className="text-gray-600 mt-2 max-w-xs mx-auto">
              {isLogin 
                ? "Sign in to manage your e-waste recycling efforts" 
                : "Create an account to start your sustainable e-waste journey"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100 mb-6 relative z-10">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block">Full Name</label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">Email Address</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-102 shadow-lg flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                "Processing..."
              ) : isLogin ? (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center relative z-10">
            <p className="text-gray-600">
              {isLogin ? "New to EcoWaste?" : "Already have an account?"}
              <button
                className="text-green-600 ml-2 font-medium hover:text-green-700 transition-colors"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
            
            <p className="text-xs text-gray-500 mt-4">
              Join the movement for responsible e-waste management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}