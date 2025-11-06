import { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

type DealProduct = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  discount_percentage: number | null;
  image_url: string | null;
  category: string | null;
  material: string | null;
  rating: number | null;
  review_count: number | null;
  sizes: string[] | null;
  in_stock: boolean;
  created_at: string;
};

const LIMIT = 2;

const FIELDS = `
  id, name, price, original_price, discount_percentage,
  image_url, category, material, rating, review_count,
  sizes, in_stock, created_at
`;

function DealSkeleton() {
  return (
    <div className="w-72 relative bg-white overflow-hidden border border-gray-200 rounded-lg">
      <div className="relative aspect-square bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

const BestDeals = () => {
  const [deals, setDeals] = useState<DealProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // Single, tiny query — same idea as Chains
        const { data, error } = await supabase
          .from("products")
          .select(FIELDS)
          .eq("in_stock", true)
          .order("discount_percentage", { ascending: false })
          .order("created_at", { ascending: false })
          .limit(LIMIT);

        if (error) throw error;
        if (!alive) return;

        setDeals((data as DealProduct[]) ?? []);
      } catch (err: any) {
        if (!alive) return;
        setLoadError(err?.message ?? "Failed to load deals");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Same simple conditional rendering style as Chains
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="flex flex-col md:flex-row">
          {/* Title block matches your existing UI */}
          <div className="w-full md:w-64 h-32 md:h-auto bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage:
                  "url('https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/bestdeals.webp')",
              }}
            />
            <div className="relative z-10 text-center text-white p-4 md:p-8">
              <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">BEST</h2>
              <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">DEALS</h2>
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="px-4 pb-4 flex flex-wrap justify-center md:justify-start gap-4">
              <DealSkeleton />
              <DealSkeleton />
            </div>
          </div>
        </div>

        <div className="text-center mt-8 px-4">
          <Link to="/best-deals">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-medium">SHOP ALL DEALS →</Button>
          </Link>
        </div>
      </section>
    );
  }

  if (loadError) {
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
              backgroundImage:
                "url('https://xdidixccpcgzbqqawywf.supabase.co/storage/v1/object/public/images/bestdeals.webp')",
            }}
          />
          <div className="relative z-10 text-center text-white p-4 md:p-8">
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">BEST</h2>
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">DEALS</h2>
            <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto text-white" />
          </div>
        </div>

        {/* Two simple cards, like Chains grid cards */}
        <div className="flex-1 overflow-hidden">
          <div className="px-4 pb-4 flex flex-wrap justify-center md:justify-start gap-4">
            {deals.length > 0 ? (
              deals.map((product) => (
                <div
                  key={product.id}
                  className="w-72 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {product.image_url ? (
                      <img
                        src={
                          product.image_url.includes("?")
                            ? product.image_url
                            : `${product.image_url}?width=320&quality=60`
                        }
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        width={320}
                        height={320}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}

                    {product.discount_percentage && product.discount_percentage > 0 && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                          {product.discount_percentage}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-xs text-gray-500 uppercase font-medium">
                      {product.category || "JEWELRY"} • {product.material || "MOISSANITE"}
                    </div>

                    <h3 className="font-medium text-gray-900 line-clamp-2 leading-tight text-sm">{product.name}</h3>

                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${
                              i < Math.floor(product.rating || 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            } w-3 h-3`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs">({product.review_count || 0})</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-blue-600 text-lg">
                        ${((product.price ?? 0) / 100).toFixed(2)}
                      </span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-gray-500 line-through text-sm">
                          ${((product.original_price ?? 0) / 100).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full py-8">No deals available at the moment</div>
            )}
          </div>
        </div>
      </div>

      {/* Shop All Deals Button */}
      <div className="text-center mt-8 px-4">
        <Link to="/best-deals">
          <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-medium">SHOP ALL DEALS →</Button>
        </Link>
      </div>
    </section>
  );
};

export default BestDeals;
