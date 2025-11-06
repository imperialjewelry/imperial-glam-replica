import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { memo } from "react";

const LIMIT = 6;

const FIELDS = `
  id, name, price, original_price, discount_percentage,
  image_url, category, material, rating, review_count,
  sizes, in_stock
`;

// Optimized thumbnail with better defaults
function thumb(url?: string | null) {
  if (!url) {
    return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=512&q=75";
  }
  if (url.includes("?")) return url;
  return `${url}?width=512&quality=75`;
}

// Minimal skeleton
const DealSkeleton = memo(() => (
  <div className="w-72 bg-white border border-gray-200 rounded-lg overflow-hidden">
    <div className="aspect-square bg-gray-100" />
    <div className="p-4 space-y-2">
      <div className="h-3 w-28 bg-gray-200 rounded" />
      <div className="h-4 w-44 bg-gray-200 rounded" />
      <div className="flex items-center gap-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-8 bg-gray-200 rounded" />
      </div>
      <div className="h-5 w-24 bg-gray-200 rounded" />
    </div>
  </div>
));

// Memoized product card
const DealCard = memo(({ product }: { product: any }) => (
  <div className="w-72 group bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg">
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      <img
        src={thumb(product.image_url)}
        alt={product.name}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        width={512}
        height={512}
        onError={(e) => {
          e.currentTarget.src = thumb(undefined);
        }}
      />

      {product.discount_percentage > 0 && (
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
            {product.discount_percentage}% OFF
          </Badge>
        </div>
      )}

      {product.sizes?.length > 0 && (
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {product.sizes.slice(0, 2).map((size: string, idx: number) => (
            <Badge key={idx} className="bg-gray-800 text-white text-xs px-1 py-0.5">
              {size}
            </Badge>
          ))}
        </div>
      )}
    </div>

    <div className="p-4">
      <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
        {product.category || "JEWELRY"} • {product.material || "MOISSANITE"}
      </div>

      <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">{product.name}</h3>

      <div className="flex items-center space-x-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(product.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">({product.review_count || 0})</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-lg font-bold text-blue-600">${((product.price ?? 0) / 100).toFixed(2)}</span>
        {product.original_price && product.original_price > product.price && (
          <span className="text-sm text-gray-400 line-through">
            ${((product.original_price ?? 0) / 100).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  </div>
));

const BestDeals = () => {
  const {
    data: dealProducts = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["best-deals-homepage", LIMIT],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(FIELDS)
        .eq("in_stock", true)
        .order("discount_percentage", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(LIMIT);

      if (error) throw error;
      return data ?? [];
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  if (error) {
    console.error("Best deals error:", error);
    return (
      <section className="py-16 bg-white">
        <div className="flex items-center justify-center">
          <div className="text-lg text-red-500">Error loading best deals</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="flex flex-col md:flex-row">
        {/* Title section */}
        <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/bestdeals.webp')`,
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">BEST</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">DEALS</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1 px-4 pb-4 overflow-x-auto">
          <div className="flex gap-4">
            {isLoading ? (
              <>
                <DealSkeleton />
                <DealSkeleton />
              </>
            ) : dealProducts.length > 0 ? (
              dealProducts.map((product) => <DealCard key={product.id} product={product} />)
            ) : (
              <div className="text-gray-500 text-center w-full py-8">No products available at the moment</div>
            )}
          </div>
        </div>
      </div>

      {/* Shop All Button */}
      <div className="text-center mt-8 px-4">
        <Link to="/best-deals">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-medium">SHOP ALL DEALS →</Button>
        </Link>
      </div>
    </section>
  );
};

export default BestDeals;
