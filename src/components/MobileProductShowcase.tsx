import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
interface MobileProductShowcaseProps {
  category: string;
  tableName: string;
  title: string;
}
interface ProductImage {
  id: string;
  name: string;
  image_url: string;
}
const MobileProductShowcase = ({
  category,
  tableName,
  title
}: MobileProductShowcaseProps) => {
  const {
    data: products = []
  } = useQuery({
    queryKey: [`mobile-showcase-${tableName}`],
    queryFn: async () => {
      try {
        // First, let's check what columns exist in this table
        const {
          data,
          error
        } = await supabase.from(tableName as any).select('*').limit(4);
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return [];
        }

        // Convert the data to our expected format, handling different column names
        const processedData = (data || []).map((item: any) => ({
          id: item.id || '',
          name: item.name || item.title || 'Product',
          image_url: item.image_url || item.image || '/placeholder.svg'
        })) as ProductImage[];
        return processedData;
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
      }
    }
  });
  if (products.length === 0) return null;
  return <div className="block md:hidden px-4 py-6">
      <div className="grid grid-cols-4 gap-2 mb-6">
        {products.map(product => <div key={product.id} className="aspect-square">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = '/placeholder.svg';
        }} />
          </div>)}
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">All Iced Out 925 Silver, 14K White, Yellow and Rose Gold Jewelry</p>
      </div>
    </div>;
};
export default MobileProductShowcase;