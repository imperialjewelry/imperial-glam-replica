
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCheckoutProps {
  product: {
    id: string;
    name: string;
    price: number;
    sizes?: string[];
    image_url: string;
    stripe_product_id: string;
    stripe_price_id?: string;
  };
  onViewDetails?: () => void;
}

const ProductCheckout = ({ product, onViewDetails }: ProductCheckoutProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    if (!product.stripe_price_id) {
      toast({
        title: "Product Error",
        description: "This product is not available for purchase at the moment.",
        variant: "destructive"
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      selectedSize,
      stripe_price_id: product.stripe_price_id
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`
    });

    dispatch({ type: 'TOGGLE_CART' });
  };

  return (
    <div className="flex flex-col space-y-2">
      {product.sizes && product.sizes.length > 0 && (
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-xs"
        >
          <option value="">Select Size</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      )}
      
      <div className="flex space-x-2">
        {onViewDetails ? (
          <Button
            onClick={onViewDetails}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 text-xs"
          >
            View Details
          </Button>
        ) : (
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 text-xs"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCheckout;
