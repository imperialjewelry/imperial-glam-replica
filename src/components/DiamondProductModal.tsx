
import { useState } from 'react';
import { X, Star, ShoppingCart, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface DiamondProductModalProps {
  product: any | null;
  onClose: () => void;
  allProducts?: any[];
}

interface LengthOption {
  length?: string;
  carat_weight?: string;
  price: number;
  stripe_price_id: string;
}

const DiamondProductModal = ({ product, onClose, allProducts = [] }: DiamondProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLengthOption, setSelectedLengthOption] = useState<LengthOption | null>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(
    product ? allProducts.findIndex(p => p.id === product.id) : 0
  );
  const { dispatch } = useCart();

  const currentProduct = allProducts[currentProductIndex] || product;

  if (!currentProduct) return null;

  // Parse length options from lengths_and_prices JSON
  const lengthsAndPricesData = (currentProduct as any).lengths_and_prices;
  const lengthOptions: LengthOption[] = lengthsAndPricesData 
    ? Array.isArray(lengthsAndPricesData) 
      ? (lengthsAndPricesData as any[])
          .filter(option => {
            const identifier = option.length || option.carat_weight || '';
            return identifier && identifier.trim() !== '';
          })
          .map(option => ({
            length: option.length,
            carat_weight: option.carat_weight,
            price: option.price || 0,
            stripe_price_id: option.stripe_price_id || ''
          }))
          .filter(option => {
            const identifier = option.length || option.carat_weight || '';
            return identifier.trim() !== '';
          })
      : []
    : [];

  const hasLengthOptions = lengthOptions.length > 0;
  const currentPrice = selectedLengthOption ? selectedLengthOption.price : currentProduct.price;
  const currentStripeId = selectedLengthOption ? selectedLengthOption.stripe_price_id : currentProduct.stripe_price_id;

  const navigateToProduct = (direction: 'prev' | 'next') => {
    if (allProducts.length <= 1) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentProductIndex > 0 ? currentProductIndex - 1 : allProducts.length - 1;
    } else {
      newIndex = currentProductIndex < allProducts.length - 1 ? currentProductIndex + 1 : 0;
    }
    
    setCurrentProductIndex(newIndex);
    setSelectedSize('');
    setSelectedLengthOption(null);
  };

  const handleAddToCart = () => {
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
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
      ? (selectedLengthOption.length || selectedLengthOption.carat_weight)
      : undefined;

    const cartItem = {
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentPrice,
      image_url: currentProduct.image_url,
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
    { text: "Premium Quality", subtext: "moissanite" },
    { text: "Lab Certified", subtext: "authenticity" },
    { text: "Brilliant Cut", subtext: "maximum sparkle" },
    { text: "Conflict Free", subtext: "ethically sourced" },
    { text: "Lifetime", subtext: "warranty" },
    { text: "Imperial Jewelry", subtext: "guarantee" }
  ];

  const getDisplayLabel = () => {
    return 'Length/Size';
  };

  const getOptionDisplay = (option: LengthOption) => {
    const identifier = option.length || option.carat_weight || '';
    return `${identifier} - $${(option.price / 100).toFixed(2)}`;
  };

  const getOptionValue = (option: LengthOption) => {
    return option.length || option.carat_weight || '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full overflow-y-auto relative">
        {/* Header with navigation */}
        <div className="sticky top-0 bg-white border-b z-10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {allProducts.length > 1 && (
              <>
                <button
                  onClick={() => navigateToProduct('prev')}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  {currentProductIndex + 1} of {allProducts.length}
                </span>
                <button
                  onClick={() => navigateToProduct('next')}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
            <img
              src={currentProduct.image_url}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500 text-white">{currentProduct.category}</Badge>
                {currentProduct.in_stock && (
                  <Badge className="bg-green-500 text-white">IN STOCK</Badge>
                )}
                {currentProduct.ships_today && (
                  <Badge className="bg-blue-500 text-white">SHIPS TODAY</Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentProduct.name}</h1>
              
              <div className="flex items-center space-x-1 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-lg text-gray-500">({currentProduct.review_count || 0} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-8">
                <span className="text-4xl font-bold text-blue-600">
                  ${(currentPrice / 100).toFixed(2)}
                </span>
                {currentProduct.original_price && currentProduct.original_price > currentPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${(currentProduct.original_price / 100).toFixed(2)}
                  </span>
                )}
                {currentProduct.discount_percentage > 0 && (
                  <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                    {currentProduct.discount_percentage}% OFF
                  </Badge>
                )}
              </div>

              {currentProduct.description && (
                <p className="text-gray-600 mb-8 text-lg">{currentProduct.description}</p>
              )}
            </div>

            {/* Quality Features */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-2 gap-6">
                {qualityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{feature.text}</div>
                      <div className="text-gray-600">{feature.subtext}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Display */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">Color:</span>
                  <div className="text-gray-900 font-semibold text-lg">{currentProduct.color}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Material:</span>
                  <div className="text-gray-900 font-semibold text-lg">{currentProduct.material}</div>
                </div>
                {currentProduct.chain_type && (
                  <div>
                    <span className="font-medium text-gray-700">Chain Type:</span>
                    <div className="text-gray-900 font-semibold text-lg">{currentProduct.chain_type}</div>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Product Type:</span>
                  <div className="text-gray-900 font-semibold text-lg">{currentProduct.product_type}</div>
                </div>
              </div>

              {/* Selection Options */}
              {hasLengthOptions && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    {getDisplayLabel()} *
                  </label>
                  <Select 
                    value={selectedLengthOption ? getOptionValue(selectedLengthOption) : ''} 
                    onValueChange={(value) => {
                      const option = lengthOptions.find(opt => getOptionValue(opt) === value);
                      setSelectedLengthOption(option || null);
                    }}
                  >
                    <SelectTrigger className="text-lg py-3">
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
              {currentProduct.sizes && currentProduct.sizes.length > 0 && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Size *
                  </label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="text-lg py-3">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProduct.sizes.filter((size: string) => size && size.trim() !== '').map((size: string) => (
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-xl font-semibold"
              disabled={!currentStripeId}
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Add to Cart - ${(currentPrice / 100).toFixed(2)}
            </Button>

            {/* Product Specifications */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="font-medium text-lg">Product Type:</span>
                  <span className="ml-3 text-gray-600 text-lg">{currentProduct.product_type}</span>
                </div>
                <div>
                  <span className="font-medium text-lg">Material:</span>
                  <span className="ml-3 text-gray-600 text-lg">{currentProduct.material}</span>
                </div>
                <div>
                  <span className="font-medium text-lg">Color:</span>
                  <span className="ml-3 text-gray-600 text-lg">{currentProduct.color}</span>
                </div>
                <div>
                  <span className="font-medium text-lg">Category:</span>
                  <span className="ml-3 text-gray-600 text-lg">{currentProduct.category}</span>
                </div>
                {currentProduct.chain_type && (
                  <div>
                    <span className="font-medium text-lg">Chain Type:</span>
                    <span className="ml-3 text-gray-600 text-lg">{currentProduct.chain_type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiamondProductModal;
