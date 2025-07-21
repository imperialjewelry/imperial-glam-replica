
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCheckoutProps {
  product: {
    id: string;
    name: string;
    price: number;
    sizes?: string[];
    image_url: string;
  };
}

const ProductCheckout = ({ product }: ProductCheckoutProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeSelect, setShowSizeSelect] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setShowSizeSelect(true);
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
      selectedSize: selectedSize || undefined,
      quantity: 1
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    setSelectedSize('');
    setShowSizeSelect(false);
  };

  return (
    <div className="space-y-2">
      {showSizeSelect && product.sizes && product.sizes.length > 0 && (
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      
      <Button
        onClick={handleAddToCart}
        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-8 w-full"
        size="sm"
      >
        <ShoppingCart className="w-3 h-3 mr-1" />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCheckout;
