
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Check, Gift, CreditCard } from 'lucide-react';
import { ProductCheckout } from './ProductCheckout';

interface WatchProduct {
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
  gemstone: string | null;
  diamond_cut: string | null;
}

interface ProductDetailModalProps {
  product: WatchProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) return null;

  // Mock additional images for carousel (in real app, these would come from product data)
  const images = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ];

  const features = [
    { text: "Doesn't fade", subtext: "or tarnish" },
    { text: "Passes the", subtext: "diamond tester" },
    { text: "Shines better", subtext: "than diamonds" },
    { text: "GRA Certificate", subtext: "included" },
    { text: "10x cheaper", subtext: "than real diamond jewelry" },
    { text: "IceCartel", subtext: "Warranty" }
  ];

  const paymentLogos = [
    "PayPal", "Affirm", "Afterpay", "Visa", "Mastercard", "American Express", "Apple Pay", "Venmo", "Discover", "Bitcoin"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Images */}
          <div className="lg:w-1/2 p-6">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <Badge className="bg-yellow-500 text-black px-3 py-1">
                Made to Order - Ships by August 6
              </Badge>
              <Badge className="bg-green-500 text-white px-3 py-1 flex items-center gap-1">
                <Gift className="w-3 h-3" />
                FREE gift included
              </Badge>
            </div>

            {/* Main product image */}
            <div className="relative mb-4 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg overflow-hidden aspect-square">
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
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
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
              <div className="flex text-green-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.4/5 out of {product.review_count} Reviews</span>
            </div>

            {/* Product title */}
            <h1 className="text-2xl font-bold text-gray-900">
              {product.name.toUpperCase()}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold">
              ${(product.price / 100).toFixed(2)}
            </div>
            
            <div className="text-sm text-gray-600">
              As low as $87/mo or 0% APR with <span className="font-semibold">Affirm</span>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{feature.text}</div>
                    {feature.subtext && (
                      <div className="text-xs text-gray-600">{feature.subtext}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Color selection */}
            <div>
              <h3 className="font-medium mb-2">DIAL COLOR</h3>
              <div className="text-right text-sm text-gray-600">White</div>
            </div>

            {/* Add to cart button */}
            <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 text-lg font-semibold">
              ADD TO CART
            </Button>

            {/* Free gift banner */}
            <div className="bg-gray-100 p-3 rounded flex items-center gap-2">
              <Gift className="w-5 h-5 text-orange-500" />
              <span className="font-medium">FREE gift included</span>
            </div>

            {/* Payment methods */}
            <div className="flex flex-wrap gap-2 items-center">
              {paymentLogos.map((logo, index) => (
                <div key={index} className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                  {logo}
                </div>
              ))}
            </div>

            {/* Product description */}
            <div className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold">ICECARTEL</span> exclusive <span className="font-semibold">Moissanite Presidential Watch</span> is now available, made of{' '}
              <span className="font-semibold">stainless steel</span> and PVD plated with a thick layer of{' '}
              <span className="font-semibold">14K White Gold</span>...{' '}
              <button className="text-blue-500 font-medium">Read More</button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
