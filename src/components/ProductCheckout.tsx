
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!customerEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          productId: product.id,
          selectedSize,
          customerEmail,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white">
      <div className="flex items-center space-x-2 mb-4">
        <ShoppingCart className="w-5 h-5" />
        <h3 className="font-semibold">Quick Checkout</h3>
      </div>

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="size">Select Size</Label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Badge
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-500 hover:text-white"
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      {/* Price Display */}
      <div className="flex items-center justify-between py-2 border-t">
        <span className="font-medium">Total:</span>
        <span className="text-xl font-bold text-blue-600">
          ${(product.price / 100).toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Buy Now with Stripe
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
};

export default ProductCheckout;
