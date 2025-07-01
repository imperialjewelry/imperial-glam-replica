
import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';

const Chains = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const products = [
    {
      id: 1,
      name: "Moissanite Tennis Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "925 SILVER / UNISEX",
      price: 476,
      originalPrice: 501,
      rating: 5,
      reviews: 1082,
      badges: ["IN STOCK", "5% OFF"],
      sizes: ["6MM", "5MM", "4MM", "3MM", "2MM"]
    },
    {
      id: 2,
      name: "VVS Cuban Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "CZ / UNISEX",
      price: 225,
      originalPrice: 237,
      rating: 5,
      reviews: 256,
      badges: ["IN STOCK", "9% OFF"],
      sizes: ["3MM", "5MM"]
    },
    {
      id: 3,
      name: "VVS Cuban Link Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "CZ / UNISEX",
      price: 337,
      originalPrice: 355,
      rating: 5,
      reviews: 626,
      badges: ["IN STOCK", "5% OFF"],
      sizes: ["20MM", "15MM", "8MM"]
    },
    {
      id: 4,
      name: "5MM Moissanite Tennis Chain 14K Gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "5MM / UNISEX",
      price: 644,
      originalPrice: 678,
      rating: 5,
      reviews: 148,
      badges: ["IN STOCK", "6% OFF"]
    },
    {
      id: 5,
      name: "3MM Moissanite Tennis Chain 14K Gold",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "3MM / UNISEX",
      price: 527,
      originalPrice: 555,
      rating: 5,
      reviews: 438,
      badges: ["IN STOCK", "5% OFF"]
    },
    {
      id: 6,
      name: "Moissanite Cuban Link Chain 14K Gold (ALL SIZES)",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
      category: "925 SILVER / UNISEX",
      price: 1235,
      originalPrice: 1300,
      rating: 5,
      reviews: 1060,
      badges: ["IN STOCK", "5% OFF"]
    },
    {
      id: 7,
      name: "4MM Moissanite Tennis Chain 14K Gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      category: "4MM / UNISEX",
      price: 619,
      originalPrice: 652,
      rating: 5,
      reviews: 46,
      badges: ["IN STOCK", "5% OFF"]
    },
    {
      id: 8,
      name: "3MM Moissanite Tennis Chain/Bracelet Bundle 14K Gold",
      image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
      category: "3MM / UNISEX",
      price: 764,
      originalPrice: 804,
      rating: 5,
      reviews: 297,
      badges: ["IN STOCK", "6% OFF"]
    }
  ];

  const productTypes = [
    { name: "Cuban Chains", count: 75 },
    { name: "Ships Today", count: 36 },
    { name: "Tennis Chains", count: 32 },
    { name: "Plain Cuban Chains", count: 13 },
    { name: "Colorful Chains", count: 9 },
    { name: "Infinity Link Chains", count: 10 },
    { name: "Tennis Bracelets", count: 1 },
    { name: "Byzantine Chains", count: 3 },
    { name: "Cable Link Chains", count: 3 },
    { name: "Cluster Chains", count: 8 }
  ];

  const colors = [
    { name: "Yellow Gold", count: 160 },
    { name: "White Gold", count: 159 },
    { name: "Rose Gold", count: 154 },
    { name: "Black Gold", count: 6 }
  ];

  const materials = [
    { name: "925 Silver", count: 134 },
    { name: "14K Solid Gold", count: 1 },
    { name: "Stainless Steel", count: 34 },
    { name: "14K Gold Plated", count: 1 },
    { name: "Brass", count: 7 },
    { name: "Silver", count: 2 }
  ];

  const chainTypes = [
    "TENNIS CHAINS",
    "CUBAN LINK CHAINS", 
    "BAGUETTE CHAINS",
    "INFINITY LINK CHAINS",
    "PLAIN CUBAN CHAINS",
    "CLUSTER CHAINS",
    "MARINER LINK CHAINS"
  ];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                MOISSANITE DIAMOND CHAINS
              </h1>
              <p className="text-gray-600 mb-8">
                All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop Chains
              </p>
              
              {/* Chain Types Navigation */}
              <div className="flex flex-wrap gap-4 mb-8">
                {chainTypes.map((type, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-sm border-gray-300 hover:border-gray-400"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Hero Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80" 
                  alt="Chain 1" 
                  className="w-full rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=400&q=80" 
                  alt="Chain 2" 
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=400&q=80" 
                  alt="Chain 3" 
                  className="w-full rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80" 
                  alt="Chain 4" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg border p-6 space-y-8">
                
                {/* Product Count */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">180 Products</h3>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Type Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">PRODUCT TYPE</h3>
                  <div className="space-y-3">
                    {productTypes.map((type) => (
                      <div key={type.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={type.name} />
                          <label htmlFor={type.name} className="text-sm text-gray-700">
                            {type.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({type.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">PRICE</h3>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">FROM</label>
                      <input
                        type="number"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">TO</label>
                      <input
                        type="number"
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">COLOR</h3>
                  <div className="space-y-3">
                    {colors.map((color) => (
                      <div key={color.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={color.name} />
                          <label htmlFor={color.name} className="text-sm text-gray-700">
                            {color.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({color.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">MATERIAL</h3>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={material.name} />
                          <label htmlFor={material.name} className="text-sm text-gray-700">
                            {material.name}
                          </label>
                        </div>
                        <span className="text-sm text-gray-500">({material.count})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
                    
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-1">
                        {product.badges.map((badge, index) => (
                          <Badge
                            key={index}
                            className={`text-xs font-semibold ${
                              badge.includes('STOCK') 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      {/* Size options */}
                      {product.sizes && (
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                          {product.sizes.map((size, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-2">
                      <div className="text-xs text-gray-500 uppercase">
                        {product.category}
                      </div>
                      
                      <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chains;
