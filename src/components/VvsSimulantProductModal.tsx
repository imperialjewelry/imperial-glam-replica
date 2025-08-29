
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Check, Gift, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface VvsSimulantProduct {
  id: string;
  name: string;
  image_url: string;
  category: string;
  price: number;
  original_price: number | null;
  rating: number;
  review_count: number;
  in_stock: boolean;
  ships_today: boolean;
  discount_percentage: number;
  sizes: string[];
  product_type: string;
  color: string;
  material: string;
  carat_weight: string | null;
  cut_quality: string | null;
  clarity_grade: string | null;
  description: string | null;
  stripe_price_id: string;
}

interface VvsSimulantProductModalProps {
  product: VvsSimulantProduct | null;
  onClose: () => void;
}

const VvsSimulantProductModal = ({ product, onClose }: VvsSimulantProductModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const { dispatch } = useCart();

  if (!product) return null;

  // Mock additional images for carousel (in real app, these would come from product data)
  const images = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ];

  const features = [
    { text: "VVS Grade", subtext: "clarity" },
    { text: "Lab Certified", subtext: "authenticity" },
    { text: "Brilliant Cut", subtext: "maximum sparkle" },
    { text: "Conflict Free", subtext: "ethically sourced" },
    { text: "Lifetime", subtext: "warranty" },
    { text: "Imperial Jewelry", subtext: "guarantee" }
  ];

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      selectedSize: selectedSize || 'Standard',
      quantity: 1,
      stripe_price_id: product.stripe_price_id
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success('Added to cart!');
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Images */}
          <div className="lg:w-1/2 p-6">
            {/* Badges */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {product.in_stock && (
                <Badge className="bg-green-500 text-white px-3 py-1">
                  IN STOCK
                </Badge>
              )}
              {product.ships_today && (
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  SHIPS TODAY
                </Badge>
              )}
              {product.clarity_grade && (
                <Badge className="bg-purple-500 text-white px-3 py-1">
                  {product.clarity_grade} GRADE
                </Badge>
              )}
              <Badge className="bg-yellow-500 text-black px-3 py-1 flex items-center gap-1">
                <Gift className="w-3 h-3" />
                FREE gift included
              </Badge>
            </div>

            {/* Main product image */}
            <div className="relative mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg overflow-hidden aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              <button 
                onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail images */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Product details */}
          <div className="lg:w-1/2 p-6 space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}/5 out of {product.review_count} Reviews</span>
            </div>

            {/* Product title */}
            <h1 className="text-2xl font-bold text-gray-900">
              {product.name.toUpperCase()}
            </h1>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              {product.carat_weight && (
                <div>
                  <span className="text-sm text-gray-600">Carat Weight:</span>
                  <div className="font-medium">{product.carat_weight}</div>
                </div>
              )}
              {product.cut_quality && (
                <div>
                  <span className="text-sm text-gray-600">Cut Quality:</span>
                  <div className="font-medium">{product.cut_quality}</div>
                </div>
              )}
              {product.clarity_grade && (
                <div>
                  <span className="text-sm text-gray-600">Clarity Grade:</span>
                  <div className="font-medium">{product.clarity_grade}</div>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-600">Material:</span>
                <div className="font-medium">{product.material}</div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-purple-600">
                  ${(product.price / 100).toFixed(2)}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    ${(product.original_price / 100).toFixed(2)}
                  </span>
                )}
                {product.discount_percentage > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {product.discount_percentage}% OFF
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600">
                As low as ${((product.price / 100) / 12).toFixed(2)}/mo or 0% APR with <span className="font-semibold">Affirm</span>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{feature.text}</div>
                    {feature.subtext && (
                      <div className="text-xs text-gray-600">{feature.subtext}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">SIZE</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              ADD TO CART
            </Button>

            {/* Free gift banner */}
            <div className="bg-purple-50 p-3 rounded flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-800">FREE VVS Certificate & Gift Box included</span>
            </div>

            {/* Product description */}
            {product.description && (
              <div className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VvsSimulantProductModal;
