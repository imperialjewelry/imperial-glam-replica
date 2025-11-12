
import { useState } from 'react';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

interface LengthPrice {
  length: string;
  price: number;
  stripe_price_id: string;
}

interface Product extends Omit<Tables<'pendant_products'>, 'lengths_and_prices'> {
  lengths_and_prices?: LengthPrice[];
}

interface PendantProductModalProps {
  product: Product;
  onClose: () => void;
}

const PendantProductModal = ({ product, onClose }: PendantProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState(product.gemstone || '');
  const [selectedDiamondCut, setSelectedDiamondCut] = useState(product.diamond_cut || '');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const getCurrentPriceInfo = () => {
    const lengthsAndPrices = product.lengths_and_prices || [];

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
    const lengthsAndPrices = product.lengths_and_prices || [];

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
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

    addToCart({
      id: product.id,
      name: product.name,
      price: currentPriceInfo.price,
      image_url: product.image_url,
      selectedSize,
      selectedColor: product.color,
      selectedLength,
      stripe_price_id: currentPriceInfo.stripe_price_id,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    onClose();
  };

  const lengthsAndPrices = product.lengths_and_prices || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500 text-white">{product.category}</Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                <div className="flex items-center space-x-1 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.review_count} reviews)</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    ${(getCurrentPriceInfo().price / 100).toFixed(2)}
                  </span>
                  {product.original_price && product.original_price > getCurrentPriceInfo().price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${(product.original_price / 100).toFixed(2)}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-gray-600 mb-6">{product.description}</p>
                )}
              </div>

              {/* Product Options */}
              <div className="space-y-4">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size *
                    </label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Length Selection */}
                {lengthsAndPrices.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Length *
                    </label>
                    <Select value={selectedLength} onValueChange={setSelectedLength}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Length" />
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
                )}

                {/* Gemstone Selection */}
                {product.gemstone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gemstone
                    </label>
                    <Select value={selectedGemstone} onValueChange={setSelectedGemstone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Moissanite">Moissanite</SelectItem>
                        <SelectItem value="VVS Diamond Simulants (CZ)">VVS Diamond Simulants (CZ)</SelectItem>
                        <SelectItem value="VVS Moissanite">VVS Moissanite</SelectItem>
                        <SelectItem value="VVS Moissanites">VVS Moissanites</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Diamond Cut Selection */}
                {product.diamond_cut && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diamond Cut
                    </label>
                    <Select value={selectedDiamondCut} onValueChange={setSelectedDiamondCut}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Round Cut">Round Cut</SelectItem>
                        <SelectItem value="Baguette">Baguette</SelectItem>
                        <SelectItem value="Emerald Cut">Emerald Cut</SelectItem>
                        <SelectItem value="Baguette Cut">Baguette Cut</SelectItem>
                        <SelectItem value="Heart Cut">Heart Cut</SelectItem>
                        <SelectItem value="Marquise Cut">Marquise Cut</SelectItem>
                        <SelectItem value="Oval Cut">Oval Cut</SelectItem>
                        <SelectItem value="Pear Cut">Pear Cut</SelectItem>
                        <SelectItem value="Princess Cut">Princess Cut</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
                disabled={!getCurrentPriceInfo().stripe_price_id}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(getCurrentPriceInfo().price / 100).toFixed(2)}
              </Button>

              {/* Product Specifications */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Product Type:</span>
                    <span className="ml-2 text-gray-600">{product.product_type}</span>
                  </div>
                  <div>
                    <span className="font-medium">Material:</span>
                    <span className="ml-2 text-gray-600">{product.material}</span>
                  </div>
                  <div>
                    <span className="font-medium">Color:</span>
                    <span className="ml-2 text-gray-600">{product.color}</span>
                  </div>
                  {product.gemstone && (
                    <div>
                      <span className="font-medium">Gemstone:</span>
                      <span className="ml-2 text-gray-600">{product.gemstone}</span>
                    </div>
                  )}
                  {product.diamond_cut && (
                    <div>
                      <span className="font-medium">Diamond Cut:</span>
                      <span className="ml-2 text-gray-600">{product.diamond_cut}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendantProductModal;
