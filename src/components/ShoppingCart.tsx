
import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { state, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (!customerEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      const line_items = state.items.map(item => ({
        price: item.stripe_price_id,
        quantity: item.quantity || 1,
      }));

      console.log('Creating checkout session with items:', line_items);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          line_items,
          customerEmail: customerEmail.trim(),
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      if (data?.url) {
        console.log('Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Shopping Cart ({getTotalItems()})</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {state.items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some items to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}-${item.selectedLength || ''}`} className="flex space-x-3 border-b pb-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      
                      {/* Display selected options */}
                      <div className="text-xs text-gray-500 space-y-0.5">
                        {item.selectedLength && (
                          <p>Length: {item.selectedLength}</p>
                        )}
                        {item.selectedSize && (
                          <p>Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p>Color: {item.selectedColor}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          ${(item.price / 100).toFixed(2)}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                            className="rounded-full p-1 hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                            className="rounded-full p-1 hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-full p-1 hover:bg-gray-100 text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t px-4 py-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${(getTotalPrice() / 100).toFixed(2)}</span>
              </div>

              {/* Customer Email Input */}
              <div className="space-y-2">
                <Label htmlFor="customer-email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="customer-email"
                  type="email"
                  placeholder="Enter your email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </Button>
                
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
