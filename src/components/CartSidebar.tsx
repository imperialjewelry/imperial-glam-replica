
import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/useCart';
import ProductCheckout from './ProductCheckout';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart ({items.length})
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize}-${index}`} className="flex space-x-3 p-3 border rounded-lg">
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                  {item.selectedSize && (
                    <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                  )}
                  <p className="text-sm font-medium text-blue-600">
                    ${(item.price / 100).toFixed(2)}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                      className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${(getTotalPrice() / 100).toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleCheckout}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Checkout
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

      {/* Checkout Modal */}
      {showCheckout && items.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Checkout</h3>
              <button onClick={() => setShowCheckout(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <ProductCheckout 
                product={{
                  id: 'cart-checkout',
                  name: `Cart Items (${items.length})`,
                  price: getTotalPrice(),
                  image_url: items[0]?.image_url || '',
                  sizes: []
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
