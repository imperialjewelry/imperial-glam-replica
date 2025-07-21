
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCheckoutProps {
  product: {
    id: string;
    name: string;
    price: number;
    sizes?: string[];
    image_url: string;
    source_table?: string;
  };
  selectedSize?: string;
}

const ProductCheckout = ({ product, selectedSize }: ProductCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Determine source table based on product data or default to chain_products
      const sourceTable = product.source_table || 'chain_products';
      
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        selectedSize,
        source_table: sourceTable,
      });

      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      toast({
        title: "Error",
        description: "There was an error adding the item to your cart.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-8"
      size="sm"
    >
      {isLoading ? "..." : "Add to Cart"}
    </Button>
  );
};

export default ProductCheckout;
