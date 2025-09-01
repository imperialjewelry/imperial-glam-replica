
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileProductShowcase from '@/components/MobileProductShowcase';
import ChainProductModal from '@/components/ChainProductModal';
import BraceletProductModal from '@/components/BraceletProductModal';
import EarringProductModal from '@/components/EarringProductModal';
import GrillzProductModal from '@/components/GrillzProductModal';
import WatchProductModal from '@/components/WatchProductModal';
import PendantProductModal from '@/components/PendantProductModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BestDeals = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [fullProductData, setFullProductData] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  const {
    data: products = [],
    isLoading
  } = useQuery({
    queryKey: ['all-products-combined'],
    queryFn: async () => {
      console.log('Fetching products from all tables...');
      
      // Fetch from all individual product tables
      const tableQueries = [
        { table: 'chain_products', source: 'chain_products' },
        { table: 'bracelet_products', source: 'bracelet_products' },
        { table: 'earring_products', source: 'earring_products' },
        { table: 'grillz_products', source: 'grillz_products' },
        { table: 'watch_products', source: 'watch_products' },
        { table: 'pendant_products', source: 'pendant_products' },
        { table: 'hip_hop_ring_products', source: 'hip_hop_ring_products' },
        { table: 'engagement_ring_products', source: 'engagement_ring_products' },
        { table: 'glasses_products', source: 'glasses_products' },
        { table: 'diamond_products', source: 'diamond_products' },
        { table: 'vvs_simulant_products', source: 'vvs_simulant_products' },
        { table: 'custom_products', source: 'custom_products' }
      ];

      const allProducts = [];

      for (const { table, source } of tableQueries) {
        try {
          const { data, error } = await supabase
            .from(table as any)
            .select('*')
            .eq('in_stock', true);
          
          if (error) {
            console.error(`Error fetching from ${table}:`, error);
            continue;
          }

          // Add source table info to each product
          const productsWithSource = (data || []).map(product => ({
            ...product,
            source_table: source,
            source_id: product.id
          }));

          allProducts.push(...productsWithSource);
          console.log(`Fetched ${productsWithSource.length} products from ${table}`);
        } catch (error) {
          console.error(`Error fetching from ${table}:`, error);
        }
      }

      console.log(`Total products fetched: ${allProducts.length}`);
      return allProducts;
    }
  });

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    if (categoryFilter === 'all') return true;
    return product.category && product.category.toLowerCase() === categoryFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return (b.discount_percentage || 0) - (a.discount_percentage || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(category => category && category.trim() !== '').map(category => category.toLowerCase()))];
  
  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const handleProductClick = async (product: any) => {
    setSelectedProduct(product);
    setFullProductData(product);
  };

  const renderProductModal = () => {
    if (!selectedProduct || !fullProductData) return null;
    
    switch (selectedProduct.source_table) {
      case 'chain_products':
        return <ChainProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'bracelet_products':
        return <BraceletProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'earring_products':
        return <EarringProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'grillz_products':
        return <GrillzProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'watch_products':
        return <WatchProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'pendant_products':
        return <PendantProductModal product={fullProductData} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </>;
  }

  return <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-black to-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ALL JEWELRY</h1>
            <p className="text-xl opacity-90 mb-8">Incredible savings on premium jewelry</p>
          </div>
        </div>

        {/* Mobile Product Showcase */}
        <MobileProductShowcase category="DEALS" tableName="chain_products" />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter & Sort:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.toUpperCase()}
                    </SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
              {categoryFilter !== 'all' && ` in ${categoryFilter.toUpperCase()}`}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredProducts.map(product => <Card key={`${product.source_table}-${product.id}`} className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border-gray-200" onClick={() => handleProductClick(product)}>
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.discount_percentage > 0 && <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                          {product.discount_percentage}% OFF
                        </Badge>}
                      {product.featured && <Badge className="bg-blue-500 text-white text-xs font-semibold px-2 py-1">
                          FEATURED
                        </Badge>}
                      {product.ships_today && <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
                          SHIPS TODAY
                        </Badge>}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                      {product.category || 'UNCATEGORIZED'} • {product.material || 'N/A'}
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
                      </div>
                      <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                        {product.original_price && product.original_price > product.price && <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.original_price)}
                          </span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div> : <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
              <Button onClick={() => {
            setCategoryFilter('all');
            setSortBy('discount');
          }} className="bg-blue-600 hover:bg-blue-700">
                Clear Filters
              </Button>
            </div>}
        </div>
      </div>

      {/* Product Detail Modal */}
      {renderProductModal()}

      <Footer />
    </>;
};

export default BestDeals;
