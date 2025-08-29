
import { useState } from 'react';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type GrillzProduct = Tables<'grillz_products'>;

interface GrillzProductModalProps {
  product: GrillzProduct;
  onClose: () => void;
}

interface TeethOption {
  teeth: string;
  price: number;
  stripe_price_id: string;
}

const GrillzProductModal = ({ product, onClose }: GrillzProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedTeethOption, setSelectedTeethOption] = useState<TeethOption | null>(null);
  const { addToCart, dispatch } = useCart();
  const { toast } = useToast();

  // Parse teeth options from lengths_and_prices JSON
  const teethOptions: TeethOption[] = product.lengths_and_prices 
    ? (product.lengths_and_prices as any[]).map(option => ({
        teeth: option.teeth || option.length || '',
        price: option.price || 0,
        stripe_price_id: option.stripe_price_id || ''
      }))
    : [];

  const hasTeethOptions = teethOptions.length > 0;
  const currentPrice = selectedTeethOption ? selectedTeethOption.price : product.price;
  const currentStripeId = selectedTeethOption ? selectedTeethOption.stripe_price_id : product.stripe_price_id;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    if (hasTeethOptions && !selectedTeethOption) {
      toast({
        title: "Teeth Count Required",
        description: "Please select a teeth count before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    if (!currentStripeId) {
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
      price: currentPrice,
      image_url: product.image_url,
      selectedSize,
      selectedColor: product.color,
      stripe_price_id: currentStripeId,
      selectedLength: selectedTeethOption?.teeth || undefined,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    dispatch({ type: 'TOGGLE_CART' });
    onClose();
  };

  const qualityFeatures = [
    { text: "Doesn't fade", subtext: "or tarnish" },
    { text: "Passes the", subtext: "diamond tester" },
    { text: "Shines better", subtext: "than diamonds" },
    { text: "GRA Certificate", subtext: "included" },
    { text: "10x cheaper", subtext: "than real diamond jewelry" },
    { text: "Imperial", subtext: "Warranty" }
  ];

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
                  <Badge className="bg-green-500 text-white">IN STOCK</Badge>
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
                    ${(currentPrice / 100).toFixed(2)}
                  </span>
                  {product.original_price && (
                    <span className="text-xl text-gray-500 line-through">
                      ${(product.original_price / 100).toFixed(2)}
                    </span>
                  )}
                </div>

                {product.description && (
                  <p className="text-gray-600 mb-6">{product.description}</p>
                )}
              </div>

              {/* Quality Features */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-3 gap-4">
                  {qualityFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{feature.text}</div>
                        <div className="text-gray-600">{feature.subtext}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info Display */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Color:</span>
                    <div className="text-gray-900 font-semibold">{product.color}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Material:</span>
                    <div className="text-gray-900 font-semibold">{product.material}</div>
                  </div>
                </div>

                {/* Teeth Count Selection */}
                {hasTeethOptions && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Teeth *
                    </label>
                    <Select 
                      value={selectedTeethOption?.teeth || ''} 
                      onValueChange={(value) => {
                        const option = teethOptions.find(opt => opt.teeth === value);
                        setSelectedTeethOption(option || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Number of Teeth" />
                      </SelectTrigger>
                      <SelectContent>
                        {teethOptions.map((option) => (
                          <SelectItem key={option.teeth} value={option.teeth}>
                            {option.teeth} - ${(option.price / 100).toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

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
                        {product.sizes.filter(size => size && size.trim() !== '').map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
                disabled={!currentStripeId}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(currentPrice / 100).toFixed(2)}
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
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 text-gray-600">{product.category}</span>
                  </div>
                  {product.style && (
                    <div>
                      <span className="font-medium">Style:</span>
                      <span className="ml-2 text-gray-600">{product.style}</span>
                    </div>
                  )}
                  {product.gemstone && (
                    <div>
                      <span className="font-medium">Gemstone:</span>
                      <span className="ml-2 text-gray-600">{product.gemstone}</span>
                    </div>
                  )}
                  {product.teeth_count && (
                    <div>
                      <span className="font-medium">Teeth Count:</span>
                      <span className="ml-2 text-gray-600">{product.teeth_count}</span>
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

export default GrillzProductModal;
