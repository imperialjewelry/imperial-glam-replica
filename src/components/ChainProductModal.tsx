
import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type ChainProduct = Tables<'chain_products'>;

interface ChainProductModalProps {
  product: ChainProduct;
  onClose: () => void;
}

const ChainProductModal = ({ product, onClose }: ChainProductModalProps) => {
  const [selectedLength, setSelectedLength] = useState('');
  const { addToCart, dispatch } = useCart();
  const { toast } = useToast();

  const getCurrentPriceInfo = () => {
    let lengthsAndPrices: Array<{
      length: string;
      price: number;
      stripe_price_id: string;
    }> = [];

    if (product.lengths_and_prices) {
      try {
        const parsed = typeof product.lengths_and_prices === 'string' 
          ? JSON.parse(product.lengths_and_prices) 
          : product.lengths_and_prices;
        
        if (Array.isArray(parsed)) {
          lengthsAndPrices = parsed;
        }
      } catch (error) {
        console.error('Error parsing lengths_and_prices:', error);
      }
    }

    if (lengthsAndPrices.length > 0 && selectedLength) {
      const selectedLengthInfo = lengthsAndPrices.find(lp => lp.length === selectedLength);
      if (selectedLengthInfo) {
        return {
          price: selectedLengthInfo.price,
          stripe_price_id: selectedLengthInfo.stripe_price_id,
        };
      }
    }
    return {
      price: product.price,
      stripe_price_id: product.stripe_price_id,
    };
  };

  const handleAddToCart = () => {
    let lengthsAndPrices: Array<{
      length: string;
      price: number;
      stripe_price_id: string;
    }> = [];

    if (product.lengths_and_prices) {
      try {
        const parsed = typeof product.lengths_and_prices === 'string' 
          ? JSON.parse(product.lengths_and_prices) 
          : product.lengths_and_prices;
        
        if (Array.isArray(parsed)) {
          lengthsAndPrices = parsed;
        }
      } catch (error) {
        console.error('Error parsing lengths_and_prices:', error);
      }
    }

    if (lengthsAndPrices.length > 0 && !selectedLength) {
      toast({
        title: "Length Required", 
        description: "Please select a length before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const currentPriceInfo = getCurrentPriceInfo();
    
    if (!currentPriceInfo.stripe_price_id) {
      toast({
        title: "Product Error",
        description: "This product is not available for purchase at the moment.",
        variant: "destructive",
      });
      return;
    }

    // For chains, we don't use selectedSize or selectedColor
    addToCart({
      id: product.id,
      name: product.name,
      price: currentPriceInfo.price,
      image_url: product.image_url,
      selectedSize: '',
      selectedColor: '',
      selectedLength,
      stripe_price_id: currentPriceInfo.stripe_price_id,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    dispatch({ type: 'TOGGLE_CART' });
  };

  const getLengthsAndPrices = () => {
    if (!product.lengths_and_prices) return [];
    
    try {
      const parsed = typeof product.lengths_and_prices === 'string' 
        ? JSON.parse(product.lengths_and_prices) 
        : product.lengths_and_prices;
      
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error parsing lengths_and_prices:', error);
      return [];
    }
  };

  const lengthsAndPrices = getLengthsAndPrices();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              {product.description && (
                <p className="text-gray-600">{product.description}</p>
              )}
            </div>

            {/* Price Display */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-blue-600">
                  ${(getCurrentPriceInfo().price / 100).toFixed(2)}
                </span>
                {product.original_price && product.original_price > getCurrentPriceInfo().price && (
                  <span className="text-lg text-gray-500 line-through">
                    ${(product.original_price / 100).toFixed(2)}
                  </span>
                )}
              </div>
              
              {lengthsAndPrices.length > 0 && (
                <p className="text-sm text-gray-600">
                  Price varies by length selection
                </p>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{product.color}</Badge>
                <Badge variant="outline">{product.material}</Badge>
              </div>
            </div>

            {/* Length Selection */}
            {lengthsAndPrices.length > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length *
                  </label>
                  <Select value={selectedLength} onValueChange={setSelectedLength}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {lengthsAndPrices.map((option) => (
                        <SelectItem key={option.length} value={option.length}>
                          {option.length} - ${(option.price / 100).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${(getCurrentPriceInfo().price / 100).toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainProductModal;
