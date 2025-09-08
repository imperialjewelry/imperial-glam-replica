import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <img 
            src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelrylogo.webp" 
            alt="Imperial Jewelry Logo" 
            className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg"
          />
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The jewelry piece you're looking for seems to have been misplaced. 
            Don't worry, we have plenty more treasures to discover!
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Collection</h3>
              <p className="text-gray-600 mb-4">Explore our premium jewelry collections</p>
              <a href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                View Jewelry
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Search Products</h3>
              <p className="text-gray-600 mb-4">Find exactly what you're looking for</p>
              <a href="/search" className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Search Now
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Need help finding something specific?</p>
              <a href="/contact" className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Get Help
              </a>
            </div>
          </div>

          <nav className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="/chains" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Chains</a>
              <a href="/rings/engagement" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Engagement Rings</a>
              <a href="/watches" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Watches</a>
              <a href="/grillz" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Grillz</a>
              <a href="/bracelets" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Bracelets</a>
              <a href="/pendants" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition-colors">Pendants</a>
            </div>
            
            <a 
              href="/" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Homepage
            </a>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
