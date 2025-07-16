
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Check, Gift, Shield, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';
import ProductCheckout from '../components/ProductCheckout';
import { useCart } from '../hooks/useCart';

interface Product {
  id: string;
  stripe_product_id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  product_type: string;
  color: string;
  material: string;
  sizes: string[];
  image_url: string;
  rating: number;
  review_count: number;
  discount_percentage: number;
  in_stock: boolean;
  ships_today: boolean;
  featured: boolean;
}

const ProductDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [category, id]);

  const fetchProduct = async () => {
    if (!category || !id) return;

    try {
      let tableName = '';
      switch (category) {
        case 'chains':
          tableName = 'chain_products';
          break;
        case 'bracelets':
          tableName = 'bracelet_products';
          break;
        case 'watches':
          tableName = 'watch_products';
          break;
        case 'pendants':
          tableName = 'pendant_products';
          break;
        case 'earrings':
          tableName = 'earring_products';
          break;
        case 'custom':
          tableName = 'custom_products';
          break;
        case 'grillz':
          tableName = 'grillz_products';
          break;
        case 'glasses':
          tableName = 'glasses_products';
          break;
        case 'rings':
          tableName = 'hip_hop_ring_products';
          break;
        case 'engagement-rings':
          tableName = 'engagement_ring_products';
          break;
        case 'vvs-diamond-simulants':
          tableName = 'vvs_simulant_products';
          break;
        case 'diamond':
          tableName = 'diamond_products';
          break;
        default:
          throw new Error('Invalid category');
      }

      const { data, error } = await supabase
        .from(tableName as any)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProduct(data as Product);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "Error loading product",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      selectedSize,
      quantity
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = [product.image_url, product.image_url, product.image_url, product.image_url];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-blue-600">Home</button>
          <span>/</span>
          <button onClick={() => navigate(`/${category}`)} className="hover:text-blue-600 capitalize">{category}</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation buttons */}
              <button
                onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                disabled={selectedImageIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setSelectedImageIndex(Math.min(productImages.length - 1, selectedImageIndex + 1))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                disabled={selectedImageIndex === productImages.length - 1}
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 space-y-2">
                {product.in_stock && (
                  <Badge className="bg-green-500 text-white">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                )}
                {product.ships_today && (
                  <Badge className="bg-blue-500 text-white">Ships Today!</Badge>
                )}
                {product.discount_percentage > 0 && (
                  <Badge className="bg-yellow-500 text-black">
                    <Gift className="w-3 h-3 mr-1" />
                    FREE gift included
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-green-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating}/5 out of {product.review_count} Reviews
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${(product.price / 100).toFixed(2)}
              </span>
              {product.original_price && (
                <span className="text-lg text-gray-500 line-through">
                  ${(product.original_price / 100).toFixed(2)}
                </span>
              )}
            </div>

            {/* Payment options */}
            <div className="text-sm text-gray-600">
              4 interest-free payments or as low as $30/mo with <span className="font-semibold">Affirm</span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Doesn't fade or tarnish</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Passes the diamond tester</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Shines better than diamonds</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">GRA Certificate included</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">10x cheaper than real diamond jewelry</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-blue-500" />
                <span className="text-sm">IceCartel Warranty</span>
              </div>
            </div>

            {/* Size Guide */}
            <button className="text-blue-600 hover:underline text-sm flex items-center">
              📏 Size Guide
            </button>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-2">COLOR</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-400"></div>
                <span className="text-sm">{product.color}</span>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-2">QUANTITY</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-medium text-lg flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>ADD TO CART</span>
            </button>

            {/* Stock Status */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>In Stock - Ships Today!</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gift className="w-4 h-4 text-yellow-500" />
                <span>FREE gift included</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                <img src="/api/placeholder/60/30" alt="PayPal" className="h-6 object-contain" />
                <img src="/api/placeholder/60/30" alt="Affirm" className="h-6 object-contain" />
                <img src="/api/placeholder/60/30" alt="Afterpay" className="h-6 object-contain" />
                <img src="/api/placeholder/60/30" alt="Visa" className="h-6 object-contain" />
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6">
              <p className="text-gray-600">
                This <strong>ICECARTEL {product.color} VVS {product.product_type}</strong> is made with{' '}
                <strong>{product.material}</strong> and plated with <strong>14K Gold...</strong>{' '}
                <button className="text-blue-600 hover:underline">Read More</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
