import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Tag } from 'lucide-react';
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
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Enter a promo code",
        description: "Please enter a promo code to validate.",
        variant: "destructive",
      });
      return;
    }

    setIsValidatingPromo(true);

    try {
      const { data, error } = await supabase.functions.invoke('validate-promo-code', {
        body: { code: promoCode.trim() },
      });

      if (error) throw error;

      if (data.valid) {
        setAppliedPromo({
          code: promoCode.trim().toUpperCase(),
          discount: data.discountPercentage
        });
        toast({
          title: "Promo code applied!",
          description: data.message,
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error validating promo code:', error);
      toast({
        title: "Error",
        description: "Failed to validate promo code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    toast({
      title: "Promo code removed",
      description: "The promo code has been removed from your order.",
    });
  };

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0;
    return (getTotalPrice() * appliedPromo.discount) / 100;
  };

  const getFinalTotal = () => {
    return getTotalPrice() - getDiscountAmount();
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

    if (!shippingAddress.fullName.trim() || !shippingAddress.addressLine1.trim() || 
        !shippingAddress.city.trim() || !shippingAddress.state.trim() || 
        !shippingAddress.zipCode.trim() || !shippingAddress.country.trim()) {
      toast({
        title: "Shipping address required",
        description: "Please fill in all required shipping address fields.",
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

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          line_items,
          customerEmail: customerEmail.trim(),
          shippingAddress,
          promoCode: appliedPromo?.code || null,
          discountPercentage: appliedPromo?.discount || 0,
          cartItems: state.items, // Pass cart items for detailed order tracking
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      if (data?.url) {
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
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-white shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
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

        {/* Cart Items (scrollable) */}
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
                <div key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}-${item.selectedLength || ''}`} className="border-b pb-4 last:border-b-0">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight">
                        {item.name}
                      </h3>
                      
                      {/* Selected options */}
                      {(item.selectedLength || item.selectedSize || item.selectedColor) && (
                        <div className="text-xs text-gray-600 mb-2 space-y-1">
                          {item.selectedLength && <div>Length: {item.selectedLength}</div>}
                          {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                          {item.selectedColor && <div>Color: {item.selectedColor}</div>}
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-blue-600">
                          ${(item.price / 100).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-2 hover:bg-gray-100 text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-center bg-gray-50 rounded-lg p-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          className="rounded-full p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-semibold mx-4 min-w-[2rem] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                          className="rounded-full p-2 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
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
          <div className="border-t px-4 py-4 space-y-4 flex-shrink-0">
            {/* Promo Code */}
            <div className="space-y-1">
              <Label className="text-xs font-medium">Promo Code</Label>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{appliedPromo.code}</span>
                    <span className="text-sm text-green-600">({appliedPromo.discount}% off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-1">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 h-8 text-xs"
                  />
                  <Button
                    onClick={validatePromoCode}
                    disabled={isValidatingPromo}
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    {isValidatingPromo ? 'Validating...' : 'Apply'}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal:</span>
                <span>${(getTotalPrice() / 100).toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount ({appliedPromo.discount}%):</span>
                  <span>-${(getDiscountAmount() / 100).toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between text-lg font-semibold border-t pt-2">
                <span>Total:</span>
                <span>${(getFinalTotal() / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="customer-email" className="text-xs font-medium">
                Email Address
              </Label>
              <Input
                id="customer-email"
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full h-8 text-xs"
              />
            </div>

            {/* Shipping Address */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Shipping Address</Label>
              
              <div className="space-y-2">
                <Input
                  placeholder="Full Name *"
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full h-8 text-xs"
                />
                
                <Input
                  placeholder="Address Line 1 *"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  className="w-full h-8 text-xs"
                />
                
                <Input
                  placeholder="Address Line 2 (Optional)"
                  value={shippingAddress.addressLine2}
                  onChange={(e) => setShippingAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                  className="w-full h-8 text-xs"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="City *"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    className="h-8 text-xs"
                  />
                  
                  <Input
                    placeholder="State *"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="h-8 text-xs"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="ZIP Code *"
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                    className="h-8 text-xs"
                  />
                  
                  <Input
                    placeholder="Country *"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
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
  );
};

export default ShoppingCart;