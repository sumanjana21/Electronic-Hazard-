import Image from 'next/image';
import Link from 'next/link';
import landing from '../public/landing2.webp';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">EW</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800">EcoWaste</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Pricing</Link>
            <Link href="#contact" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
  <Link href="/auth" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">Login</Link>
  <Link href="/auth" className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition-colors">Sign Up</Link>
</div>
          
          <button className="md:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800 mb-6">
                Transforming E-Waste Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">for a Sustainable Future</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Connect with reliable pickup services, get fair prices for your electronic waste, and contribute to a cleaner planet—all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md font-semibold text-center transition-colors">
                  Get Started
                </Link>
                <Link href="#how-it-works" className="bg-white border border-gray-300 text-gray-700 py-3 px-8 rounded-md font-semibold text-center hover:bg-gray-50 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative h-64 sm:h-80 md:h-96 w-full">
                <div className="absolute -top-4 -left-4 h-full w-full bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl opacity-20"></div>
                <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-full w-full relative">
                    <Image 
                      src={landing} 
                      alt="E-Waste Management Platform" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Trust Badges */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="h-8 w-24 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart E-Waste Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform connects customers, companies, and pickup services for efficient e-waste handling and recycling.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Price Estimation</h3>
              <p className="text-gray-600">Get fair and accurate price estimates for your e-waste using our advanced AI technology.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rewards & Coupons</h3>
              <p className="text-gray-600">Earn rewards and exchange coupons for benefits when you recycle your electronic waste.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Pickup</h3>
              <p className="text-gray-600">Schedule and track your e-waste pickups with real-time location tracking and updates.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600">Process transactions securely with integrated PayPal and local payment options.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Integrated Communication</h3>
              <p className="text-gray-600">Stay updated with push notifications, emails, and SMS alerts about your pickups.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Multilingual Support</h3>
              <p className="text-gray-600">Access our platform in multiple languages for an inclusive user experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our simple process makes e-waste management easy for everyone.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Register & Upload</h3>
              <p className="text-gray-600">Create an account and upload photos of your e-waste items for AI-powered price estimation.</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Schedule Pickup</h3>
              <p className="text-gray-600">Choose a convenient time and date for collection. Our verified pickup partners will come to your location.</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Rewarded</h3>
              <p className="text-gray-600">Receive payments and earn reward points that can be exchanged for exclusive coupons and benefits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Responsibly Manage Your E-Waste?</h2>
          <p className="text-white text-opacity-90 mb-10 max-w-2xl mx-auto">Join thousands of users who are making a positive impact on the environment while getting fair value for their electronic waste.</p>
          <Link href="/register" className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-md font-semibold inline-block transition-colors">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from customers, companies, and pickup partners who use our platform.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Sarah J.</h4>
                  <p className="text-gray-500 text-sm">Customer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI pricing system gave me a fair estimate for my old laptop, and the pickup process was incredibly smooth. I love that I can track everything in real-time!"
              </p>
              <div className="mt-4 flex">
                {Array.from({length: 5}).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">TechRecycle Inc.</h4>
                  <p className="text-gray-500 text-sm">Company Partner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has streamlined our e-waste acquisition process and helped us connect with eco-conscious customers. The integrated payment system is a game-changer."
              </p>
              <div className="mt-4 flex">
                {Array.from({length: 5}).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">Mark R.</h4>
                  <p className="text-gray-500 text-sm">Pickup Partner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a pickup partner, the platform makes it easy to manage routes and pickups. The map integration and notification system keep everything running efficiently."
              </p>
              <div className="mt-4 flex">
                {Array.from({length: 5}).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">10K+</p>
              <p className="text-gray-600 mt-2">Users Registered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">50+</p>
              <p className="text-gray-600 mt-2">Partner Companies</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">5K+</p>
              <p className="text-gray-600 mt-2">Monthly Pickups</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">200+</p>
              <p className="text-gray-600 mt-2">Tons Recycled</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our e-waste management platform.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How does the AI price estimation work?</h3>
              <p className="text-gray-600">Our AI technology analyzes photos of your e-waste items along with details you provide to determine a fair market value based on current recycling rates and material worth.</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Who handles the e-waste pickup?</h3>
              <p className="text-gray-600">We partner with verified pickup services and recycling companies in your area. All of our partners are vetted for proper handling and disposal practices.</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I get paid for my e-waste?</h3>
              <p className="text-gray-600">Once your items are collected and verified, you can receive payment through our secure payment system via PayPal or local payment options of your choice.</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">What types of e-waste do you accept?</h3>
              <p className="text-gray-600">We accept a wide range of electronic waste including computers, phones, tablets, TVs, appliances, and more. You can see the full list in our app when you register.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Is my data safe when I dispose of devices?</h3>
              <p className="text-gray-600">We recommend performing a factory reset on all devices before pickup. Our partner companies also offer certified data destruction services for an additional fee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Newsletter Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">Subscribe to our newsletter for the latest updates and promotions.</p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md font-medium transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EW</span>
                </div>
                <span className="ml-2 text-lg font-bold">EcoWaste</span>
              </div>
              <p className="text-gray-400 text-sm">
                Making e-waste management simple, rewarding, and sustainable for everyone.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">E-Waste Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">contact@ecowaste.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Green Street, Eco City, EC 12345</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EcoWaste. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}