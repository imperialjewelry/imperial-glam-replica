
import { useState } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type CustomProduct = Tables<'custom_products'>;

interface CustomProductModalProps {
  product: CustomProduct;
  onClose: () => void;
}

const CustomProductModal = ({ product, onClose }: CustomProductModalProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product.stripe_price_id) {
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
      price: product.price,
      image_url: product.image_url,
      selectedSize: '',
      selectedColor: product.color,
      stripe_price_id: product.stripe_price_id,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    onClose();
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
                  <Badge className="bg-green-500 text-white">CUSTOMIZABLE</Badge>
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
                    ${(product.price / 100).toFixed(2)}
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

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg"
                disabled={!product.stripe_price_id}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ${(product.price / 100).toFixed(2)}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomProductModal;
