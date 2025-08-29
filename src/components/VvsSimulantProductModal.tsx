
import { useState } from 'react';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

type VvsSimulantProduct = Tables<'vvs_simulant_products'>;

interface VvsSimulantProductModalProps {
  product: VvsSimulantProduct | null;
  onClose: () => void;
}

interface LengthOption {
  length?: string;
  carat_weight?: string;
  teeth?: string;
  price: number;
  stripe_price_id: string;
}

const VvsSimulantProductModal = ({ product, onClose }: VvsSimulantProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLengthOption, setSelectedLengthOption] = useState<LengthOption | null>(null);
  const { dispatch } = useCart();

  if (!product) return null;

  // Parse length options from lengths_and_prices JSON
  const lengthsAndPricesData = (product as any).lengths_and_prices;
  const lengthOptions: LengthOption[] = lengthsAndPricesData 
    ? Array.isArray(lengthsAndPricesData) 
      ? (lengthsAndPricesData as any[])
          .filter(option => {
            const identifier = option.length || option.carat_weight || option.teeth || '';
            return identifier && identifier.trim() !== '';
          })
          .map(option => ({
            length: option.length,
            carat_weight: option.carat_weight,
            teeth: option.teeth,
            price: option.price || 0,
            stripe_price_id: option.stripe_price_id || ''
          }))
          .filter(option => {
            const identifier = option.length || option.carat_weight || option.teeth || '';
            return identifier.trim() !== '';
          })
      : []
    : [];

  const hasLengthOptions = lengthOptions.length > 0;
  const currentPrice = selectedLengthOption ? selectedLengthOption.price : product.price;
  const currentStripeId = selectedLengthOption ? selectedLengthOption.stripe_price_id : product.stripe_price_id;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }

    if (hasLengthOptions && !selectedLengthOption) {
      toast.error('Please select an option before adding to cart.');
      return;
    }

    if (!currentStripeId) {
      toast.error('This product is not available for purchase at the moment.');
      return;
    }

    const selectedIdentifier = selectedLengthOption 
      ? (selectedLengthOption.length || selectedLengthOption.carat_weight || selectedLengthOption.teeth)
      : undefined;

    const cartItem = {
      id: product.id,
      name: product.name,
      price: currentPrice,
      image_url: product.image_url,
      selectedSize: selectedSize || 'Standard',
      quantity: 1,
      stripe_price_id: currentStripeId,
      selectedLength: selectedIdentifier,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast.success('Added to cart!');
    onClose();
  };

  const qualityFeatures = [
    { text: "VVS Grade", subtext: "clarity" },
    { text: "Lab Certified", subtext: "authenticity" },
    { text: "Brilliant Cut", subtext: "maximum sparkle" },
    { text: "Conflict Free", subtext: "ethically sourced" },
    { text: "Lifetime", subtext: "warranty" },
    { text: "Imperial Jewelry", subtext: "guarantee" }
  ];

  const getDisplayLabel = () => {
    if (product.product_type === 'Grillz' || product.category === 'Grillz') {
      return 'Number of Teeth';
    }
    return 'Carat Weight/Length';
  };

  const getOptionDisplay = (option: LengthOption) => {
    const identifier = option.teeth || option.carat_weight || option.length || '';
    return `${identifier} - $${(option.price / 100).toFixed(2)}`;
  };

  const getOptionValue = (option: LengthOption) => {
    return option.teeth || option.carat_weight || option.length || '';
  };

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
                  {product.in_stock && (
                    <Badge className="bg-green-500 text-white">IN STOCK</Badge>
                  )}
                  {product.ships_today && (
                    <Badge className="bg-blue-500 text-white">SHIPS TODAY</Badge>
                  )}
                  {product.clarity_grade && (
                    <Badge className="bg-purple-500 text-white">{product.clarity_grade} GRADE</Badge>
                  )}
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
                  {product.original_price && product.original_price > currentPrice && (
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
                  {product.carat_weight && (
                    <div>
                      <span className="font-medium text-gray-700">Carat Weight:</span>
                      <div className="text-gray-900 font-semibold">{product.carat_weight}</div>
                    </div>
                  )}
                  {product.clarity_grade && (
                    <div>
                      <span className="font-medium text-gray-700">Clarity:</span>
                      <div className="text-gray-900 font-semibold">{product.clarity_grade}</div>
                    </div>
                  )}
                  {product.cut_quality && (
                    <div>
                      <span className="font-medium text-gray-700">Cut:</span>
                      <div className="text-gray-900 font-semibold">{product.cut_quality}</div>
                    </div>
                  )}
                </div>

                {/* Selection Options */}
                {hasLengthOptions && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getDisplayLabel()} *
                    </label>
                    <Select 
                      value={selectedLengthOption ? getOptionValue(selectedLengthOption) : ''} 
                      onValueChange={(value) => {
                        const option = lengthOptions.find(opt => getOptionValue(opt) === value);
                        setSelectedLengthOption(option || null);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${getDisplayLabel()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {lengthOptions.map((option, index) => (
                          <SelectItem key={index} value={getOptionValue(option)}>
                            {getOptionDisplay(option)}
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
                  {product.carat_weight && (
                    <div>
                      <span className="font-medium">Carat Weight:</span>
                      <span className="ml-2 text-gray-600">{product.carat_weight}</span>
                    </div>
                  )}
                  {product.clarity_grade && (
                    <div>
                      <span className="font-medium">Clarity Grade:</span>
                      <span className="ml-2 text-gray-600">{product.clarity_grade}</span>
                    </div>
                  )}
                  {product.cut_quality && (
                    <div>
                      <span className="font-medium">Cut Quality:</span>
                      <span className="ml-2 text-gray-600">{product.cut_quality}</span>
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

export default VvsSimulantProductModal;
