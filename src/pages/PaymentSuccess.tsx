
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import PromoBar from '../components/PromoBar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails();
    }
  }, [sessionId]);

  const fetchOrderDetails = async () => {
    try {
      // Fetch all orders for this session (in case of multiple items)
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_session_id', sessionId);

      if (error) throw error;
      console.log('Fetched order details:', data);
      setOrderDetails(data || []);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <PromoBar />
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orderDetails.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PromoBar />
        <Header />
        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn't find your order details. Please contact support if you need assistance.</p>
            <Button onClick={() => window.location.href = '/'}>
              Return Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const firstOrder = orderDetails[0];
  const totalAmount = orderDetails.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <PromoBar />
      <Header />
      
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Order Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Summary */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-mono text-sm font-medium">{firstOrder.order_number || firstOrder.id}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Email:</span>
                <span>{firstOrder.guest_email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="capitalize text-green-600 font-medium">{firstOrder.status}</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Items Ordered:</h3>
              {orderDetails.map((order, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  {order.product_details?.image_url && (
                    <img
                      src={order.product_details.image_url}
                      alt={order.product_details?.name || 'Product'}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{order.product_details?.name || 'Product'}</h4>
                    {order.selected_size && (
                      <p className="text-sm text-gray-600">Size: {order.selected_size}</p>
                    )}
                    {order.selected_length && (
                      <p className="text-sm text-gray-600">Length: {order.selected_length}</p>
                    )}
                    <p className="text-lg font-bold text-blue-600">
                      ${(order.amount / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Info */}
            {firstOrder.promo_code && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Promo Code Applied:</span>
                  <span className="font-medium text-green-600">
                    {firstOrder.promo_code} ({firstOrder.discount_percentage}% off)
                  </span>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Paid:</span>
                <span className="text-blue-600">${(totalAmount / 100).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-blue-900 mb-2">What's Next?</h2>
          <ul className="text-blue-800 space-y-1">
            <li>• You'll receive an order confirmation email shortly</li>
            <li>• Your order will be processed within 1-2 business days</li>
            <li>• Shipping information will be sent to your email</li>
            <li>• Expected delivery: 3-7 business days</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => window.location.href = '/chains'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <Button 
            className="flex-1 bg-blue-500 hover:bg-blue-600"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccess;
