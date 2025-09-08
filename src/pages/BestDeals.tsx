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
import HipHopRingProductModal from '@/components/HipHopRingProductModal';
import EngagementRingProductModal from '@/components/EngagementRingProductModal';
import GlassesProductModal from '@/components/GlassesProductModal';
import CustomProductModal from '@/components/CustomProductModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ProductData {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  category: string;
  material: string;
  image_url: string;
  rating?: number;
  review_count?: number;
  discount_percentage?: number;
  in_stock?: boolean;
  ships_today?: boolean;
  featured?: boolean;
  source_table?: string;
  source_id?: string;
  description?: string;
  color: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  stripe_product_id: string;
  stripe_price_id?: string;
  sizes?: string[];
  lengths_and_prices?: any;
  gemstone?: string;
  diamond_cut?: string;
  chain_type?: string;
  frame_style?: string;
  lens_color?: string;
  style?: string;
  teeth_count?: string;
  shape?: string;
  carat_weight?: string;
  cut_quality?: string;
  clarity_grade?: string;
  customizable?: boolean;
  [key: string]: any;
}
const BestDeals = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [fullProductData, setFullProductData] = useState<ProductData | null>(null);
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
      const tableQueries = ['chain_products', 'bracelet_products', 'earring_products', 'grillz_products', 'watch_products', 'pendant_products', 'hip_hop_ring_products', 'engagement_ring_products', 'glasses_products', 'diamond_products', 'vvs_simulant_products', 'custom_products'];
      const allProducts: ProductData[] = [];
      for (const tableName of tableQueries) {
        try {
          console.log(`Fetching from ${tableName}...`);
          const {
            data,
            error
          } = await supabase.from(tableName as any).select('*');
          if (error) {
            console.error(`Error fetching from ${tableName}:`, error);
            continue;
          }
          if (data && Array.isArray(data)) {
            console.log(`Found ${data.length} items in ${tableName}`);

            // Process each product
            const productsWithSource = data.filter((item: any) => {
              // Only exclude truly invalid items
              if (!item || typeof item !== 'object') {
                return false;
              }
              if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
                return false;
              }
              return true;
            }).map((product: any): ProductData => {
              return {
                id: product.id || '',
                name: product.name || '',
                price: product.price || 0,
                source_table: tableName,
                source_id: product.id || '',
                category: product.category || '',
                material: product.material || '',
                color: product.color || '',
                product_type: product.product_type || '',
                image_url: product.image_url || '',
                created_at: product.created_at || new Date().toISOString(),
                updated_at: product.updated_at || new Date().toISOString(),
                stripe_product_id: product.stripe_product_id || '',
                description: product.description || '',
                gemstone: product.gemstone || '',
                diamond_cut: product.diamond_cut || '',
                chain_type: product.chain_type || '',
                frame_style: product.frame_style || '',
                lens_color: product.lens_color || '',
                style: product.style || '',
                teeth_count: product.teeth_count || '',
                shape: product.shape || '',
                carat_weight: product.carat_weight || '',
                cut_quality: product.cut_quality || '',
                clarity_grade: product.clarity_grade || '',
                customizable: product.customizable || false,
                sizes: product.sizes || [],
                lengths_and_prices: product.lengths_and_prices || [],
                rating: product.rating || 5.0,
                review_count: product.review_count || 0,
                discount_percentage: product.discount_percentage || 0,
                in_stock: product.in_stock !== undefined ? product.in_stock : true,
                ships_today: product.ships_today || false,
                featured: product.featured || false,
                original_price: product.original_price,
                stripe_price_id: product.stripe_price_id
              };
            });
            allProducts.push(...productsWithSource);
            console.log(`Processed ${productsWithSource.length} products from ${tableName}`);
          }
        } catch (error) {
          console.error(`Exception when fetching from ${tableName}:`, error);
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
  const handleProductClick = async (product: ProductData) => {
    setSelectedProduct(product);
    setFullProductData(product);
  };
  const renderProductModal = () => {
    if (!selectedProduct || !fullProductData) return null;
    switch (selectedProduct.source_table) {
      case 'chain_products':
        return <ChainProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'bracelet_products':
        return <BraceletProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'earring_products':
        return <EarringProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'grillz_products':
        return <GrillzProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'watch_products':
        return <WatchProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'pendant_products':
        return <PendantProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'hip_hop_ring_products':
        return <HipHopRingProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'engagement_ring_products':
        return <EngagementRingProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'glasses_products':
        return <GlassesProductModal product={fullProductData as any} onClose={() => {
          setSelectedProduct(null);
          setFullProductData(null);
        }} />;
      case 'custom_products':
        return <CustomProductModal product={fullProductData as any} onClose={() => {
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
        

        {/* Mobile Product Showcase */}
        <MobileProductShowcase category="DEALS" tableName="chain_products" title="ALL JEWELRY" />

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
                    <img src={product.image_url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {(product.discount_percentage || 0) > 0 && <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
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