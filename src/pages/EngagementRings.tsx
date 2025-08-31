import { useState, useEffect } from 'react';
import { Star, ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import MobileProductShowcase from '@/components/MobileProductShowcase';

type EngagementRingProduct = Tables<'engagement_ring_products'>;

const EngagementRings = () => {
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<EngagementRingProduct[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<EngagementRingProduct | null>(null);
  const [openSections, setOpenSections] = useState({
    productType: false,
    price: false,
    color: false,
    material: false,
    chainType: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const {
      data,
      error
    } = await supabase.from('engagement_ring_products').select('*').order('created_at', {
      ascending: false
    });
    if (error) {
      console.error('Error fetching engagement ring products:', error);
    } else {
      setProducts(data || []);
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const productTypes = [{
    name: "Halo Rings",
    count: 4
  }, {
    name: "Solitaire Rings",
    count: 3
  }, {
    name: "Pave Rings",
    count: 2
  }, {
    name: "Side Stone Rings",
    count: 2
  }, {
    name: "Three Stone Rings",
    count: 1
  }];

  const colors = [{
    name: "Yellow Gold",
    count: 6
  }, {
    name: "White Gold",
    count: 5
  }, {
    name: "Rose Gold",
    count: 4
  }];

  const materials = [{
    name: "14K Solid Gold",
    count: 8
  }, {
    name: "18K Solid Gold",
    count: 3
  }, {
    name: "925 Silver",
    count: 2
  }];

  const ringStyles = [{
    name: "Classic",
    count: 4
  }, {
    name: "Modern",
    count: 3
  }, {
    name: "Vintage",
    count: 2
  }];

  return <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Desktop Hero Section */}
      {!isMobile && (
        <div className="bg-gray-50 py-12 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              MOISSANITE ENGAGEMENT RINGS
            </h1>
            <p className="text-lg text-gray-600">
              All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Engagement Rings
            </p>
          </div>
        </div>
      )}

      {/* Mobile Product Showcase */}
      <MobileProductShowcase category="ENGAGEMENT RINGS" tableName="engagement_ring_products" />

      {/* Main Content */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Desktop Sidebar Filters */}
        {!isMobile && <div className="w-64 bg-white p-6 border-r border-gray-200 min-h-screen">
            <h2 className="text-lg font-semibold mb-6">Filters</h2>
            
            {/* Product Type */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRODUCT TYPE</h3>
              <div className="space-y-3">
                {productTypes.map(type => <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${type.name}`} />
                      <label htmlFor={`desktop-${type.name}`} className="text-sm text-gray-700">
                        {type.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({type.count})</span>
                  </div>)}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">PRICE</h3>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">FROM</label>
                  <input type="number" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">TO</label>
                  <input type="number" value={priceTo} onChange={e => setPriceTo(e.target.value)} placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">COLOR</h3>
              <div className="space-y-3">
                {colors.map(color => <div key={color.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${color.name}`} />
                      <label htmlFor={`desktop-${color.name}`} className="text-sm text-gray-700">
                        {color.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({color.count})</span>
                  </div>)}
              </div>
            </div>

            {/* Material */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">MATERIAL</h3>
              <div className="space-y-3">
                {materials.map(material => <div key={material.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${material.name}`} />
                      <label htmlFor={`desktop-${material.name}`} className="text-sm text-gray-700">
                        {material.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({material.count})</span>
                  </div>)}
              </div>
            </div>

             {/* Ring Style */}
             <div className="mb-8">
              <h3 className="font-medium text-gray-900 mb-4 uppercase">RING STYLE</h3>
              <div className="space-y-3">
                {ringStyles.map(style => <div key={style.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`desktop-${style.name}`} />
                      <label htmlFor={`desktop-${style.name}`} className="text-sm text-gray-700">
                        {style.name}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">({style.count})</span>
                  </div>)}
              </div>
            </div>
          </div>}

        {/* Products Section */}
        <div className={`flex-1 ${isMobile ? 'py-4 px-4' : 'py-8 px-8'}`}>
          {/* Product count and controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">{products.length} Products</span>
            <div className="flex items-center space-x-4">
              {!isMobile && <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>}
              {isMobile && <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>FILTER</span>
                </Button>}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            {products.map(product => <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {product.in_stock && <Badge className="text-xs font-semibold bg-blue-500 text-white">
                        IN STOCK
                      </Badge>}
                    {product.discount_percentage && product.discount_percentage > 0 && <Badge className="text-xs font-semibold bg-red-500 text-white">
                        {product.discount_percentage}% OFF
                      </Badge>}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-2">
                  <div className="text-xs text-gray-500 uppercase">
                    {product.category}
                  </div>
                  
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-tight">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-600">${(product.price / 100).toFixed(2)}</span>
                    {product.original_price && <span className="text-sm text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </span>}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};

export default EngagementRings;
