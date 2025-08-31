
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface MobileProductShowcaseProps {
  category: string;
  tableName: string;
}

interface ProductImage {
  id: string;
  name: string;
  image_url: string;
}

const MobileProductShowcase = ({ category, tableName }: MobileProductShowcaseProps) => {
  const { data: products = [] } = useQuery({
    queryKey: [`mobile-showcase-${tableName}`],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from(tableName as any)
          .select('id, name, image_url')
          .limit(4);
        
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return [];
        }
        return (data || []) as ProductImage[];
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return [];
      }
    }
  });

  if (products.length === 0) return null;

  return (
    <div className="block md:hidden px-4 py-6">
      <div className="grid grid-cols-4 gap-2 mb-6">
        {products.map((product) => (
          <div key={product.id} className="aspect-square">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          MOISSANITE DIAMOND {category.toUpperCase()}
        </h2>
        <p className="text-sm text-gray-600">
          All Moissanite Iced Out 925 Silver, 14K White, Yellow and Rose Gold Hip Hop {category}
        </p>
      </div>
    </div>
  );
};

export default MobileProductShowcase;
