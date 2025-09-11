import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Imperial Jewelry</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Browse our collection of premium diamond jewelry, chains, rings, and custom pieces at Imperial Jewelry." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://shopimperialjewelry.com/404" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <img 
              src="https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/imperialjewelrylogo.webp" 
              alt="Imperial Jewelry Logo" 
              className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg"
            />
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The jewelry piece you're looking for seems to have been misplaced. 
              Don't worry, we have plenty more treasures to discover!
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Attempted URL: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Browse Collection</h3>
                <p className="text-muted-foreground mb-4">Explore our premium jewelry collections</p>
                <Button asChild>
                  <Link to="/">View Jewelry</Link>
                </Button>
              </div>

              <div className="bg-card rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Search Products</h3>
                <p className="text-muted-foreground mb-4">Find exactly what you're looking for</p>
                <Button asChild variant="secondary">
                  <Link to="/search">Search Now</Link>
                </Button>
              </div>

              <div className="bg-card rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow border md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">Contact Support</h3>
                <p className="text-muted-foreground mb-4">Need help finding something specific?</p>
                <Button asChild variant="outline">
                  <Link to="/contact">Get Help</Link>
                </Button>
              </div>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-xl font-semibold text-foreground mb-6">Popular Categories</h3>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/chains">Chains</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/rings/engagement">Engagement Rings</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/watches">Watches</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/grillz">Grillz</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/bracelets">Bracelets</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/pendants">Pendants</Link>
                </Button>
              </div>
            </div>

            {/* Report Broken Link Section */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Found a Broken Link?</h3>
              <p className="text-muted-foreground mb-4">
                Help us improve your experience by reporting this broken link.
              </p>
              <Button asChild variant="outline">
                <Link to="/contact?subject=Broken Link&url=${encodeURIComponent(location.pathname)}">
                  Report Issue
                </Link>
              </Button>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/" className="inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
