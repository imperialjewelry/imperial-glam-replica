
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Star, Truck, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProductCheckout from "@/components/ProductCheckout";

interface BraceletProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  product_type: string;
  color: string;
  material: string;
  gemstone: string;
  diamond_cut: string;
  sizes: string[];
  image_url: string;
  rating: number;
  review_count: number;
  discount_percentage: number;
  in_stock: boolean;
  ships_today: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const Bracelets = () => {
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedGemstone, setSelectedGemstone] = useState("all");
  const [selectedDiamondCut, setSelectedDiamondCut] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['bracelet-products'],
    queryFn: async (): Promise<BraceletProduct[]> => {
      const { data, error } = await supabase
        .from('bracelet_products')
        .select('*')
        .order('featured', { ascending: false });
      
      if (error) {
        console.error('Error fetching bracelet products:', error);
        throw error;
      }
      return data || [];
    },
  });

  // Get unique filter values from products
  const productTypes = [...new Set(products.map(p => p.product_type))];
  const colors = [...new Set(products.map(p => p.color))];
  const materials = [...new Set(products.map(p => p.material))];
  const gemstones = [...new Set(products.map(p => p.gemstone).filter(Boolean))];
  const diamondCuts = [...new Set(products.map(p => p.diamond_cut).filter(Boolean))];

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    return (
      (selectedProductType === "all" || product.product_type === selectedProductType) &&
      (selectedColor === "all" || product.color === selectedColor) &&
      (selectedMaterial === "all" || product.material === selectedMaterial) &&
      (selectedGemstone === "all" || product.gemstone === selectedGemstone) &&
      (selectedDiamondCut === "all" || product.diamond_cut === selectedDiamondCut)
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return b.featured ? 1 : -1;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Premium Bracelets</h1>
          <p className="text-xl md:text-2xl mb-8">Luxury bracelets with VVS stones and premium materials</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <Badge variant="secondary" className="bg-white/20 text-white">Free Shipping</Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">VVS Quality</Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">14K Gold</Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">Lifetime Warranty</Badge>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Select value={selectedProductType} onValueChange={setSelectedProductType}>
              <SelectTrigger>
                <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {productTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                {colors.map(color => (
                  <SelectItem key={color} value={color}>{color}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                {materials.map(material => (
                  <SelectItem key={material} value={material}>{material}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGemstone} onValueChange={setSelectedGemstone}>
              <SelectTrigger>
                <SelectValue placeholder="Gemstone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gemstones</SelectItem>
                {gemstones.map(gemstone => (
                  <SelectItem key={gemstone} value={gemstone}>{gemstone}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDiamondCut} onValueChange={setSelectedDiamondCut}>
              <SelectTrigger>
                <SelectValue placeholder="Diamond Cut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuts</SelectItem>
                {diamondCuts.map(cut => (
                  <SelectItem key={cut} value={cut}>{cut}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} bracelets
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">Featured</Badge>
                  )}
                  {product.ships_today && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Ships Today
                    </Badge>
                  )}
                  {product.discount_percentage > 0 && (
                    <Badge className="absolute bottom-2 left-2 bg-orange-500 text-white">
                      {product.discount_percentage}% OFF
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <CardTitle className="text-lg font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                  {product.name}
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.review_count})</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${(product.original_price / 100).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Type:</span> {product.product_type}</p>
                  <p><span className="font-medium">Color:</span> {product.color}</p>
                  <p><span className="font-medium">Material:</span> {product.material}</p>
                  {product.gemstone && (
                    <p><span className="font-medium">Gemstone:</span> {product.gemstone}</p>
                  )}
                  {product.diamond_cut && (
                    <p><span className="font-medium">Cut:</span> {product.diamond_cut}</p>
                  )}
                </div>

                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Available Sizes:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              <Separator />

              <CardFooter className="p-4">
                <ProductCheckout
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    sizes: product.sizes,
                    image_url: product.image_url,
                  }}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bracelets found matching your filters.</p>
            <Button
              onClick={() => {
                setSelectedProductType("all");
                setSelectedColor("all");
                setSelectedMaterial("all");
                setSelectedGemstone("all");
                setSelectedDiamondCut("all");
              }}
              className="mt-4"
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bracelets;
