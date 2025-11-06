import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useRef, useMemo, useCallback } from "react";

const PAGE_SIZE = 24;

// Small helper to serve lighter thumbnails (works with Supabase public storage URLs)
function getThumb(url?: string | null) {
  if (!url) return "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=70";
  // Append safe defaults if no query string present; if present, leave as-is.
  if (url.includes("?")) return url;
  return `${url}?width=512&quality=70`;
}

const FIELDS = `
  id, name, price, original_price, discount_percentage,
  image_url, category, material, rating, review_count,
  sizes, in_stock, created_at
`;

const BestDeals = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["best-deals-homepage"],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("products")
        .select(FIELDS)
        .eq("in_stock", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }

      return data || [];
    },
    getNextPageParam: (lastPage, allPages) => (lastPage.length === PAGE_SIZE ? allPages.length : undefined),
    initialPageParam: 0,
    // Faster back/forward and prevents refetch storms
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const dealProducts = useMemo(() => (data?.pages ?? []).flat(), [data]);

  // Intersection observer for infinite scroll (with the HORIZONTAL scroller as root)
  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const first = entries[0];
      if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    const rootEl = scrollerRef.current; // <-- key: use horizontal scroller as root

    if (!sentinel || !rootEl) return;

    const observer = new IntersectionObserver(onIntersect, {
      root: rootEl,
      // rootMargin left adds a bit of prefetch as you near the end of the row
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.1,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [onIntersect, data]); // rebind if pages change (sentinel moves)

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading best deals...</div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Best deals products error:", error);
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
        {/* Title section with background image - smaller on mobile */}
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

        {/* Products horizontal scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="overflow-x-auto" ref={scrollerRef} aria-label="Best Deals">
            <div className="flex space-x-4 px-4 pb-4 items-stretch">
              {dealProducts.length > 0 ? (
                <>
                  {dealProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-64 group relative bg-white overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                    >
                      {/* Product image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={getThumb(product.image_url)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=70";
                          }}
                          loading="lazy"
                          decoding="async"
                          width={512}
                          height={512}
                        />

                        {/* Discount badge - positioned on left side */}
                        {product.discount_percentage > 0 && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-red-500 text-white text-xs font-semibold px-2 py-1">
                              {product.discount_percentage}% OFF
                            </Badge>
                          </div>
                        )}

                        {/* Size options */}
                        {product.sizes && product.sizes.length > 0 && (
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                            {product.sizes.slice(0, 2).map((size: string, index: number) => (
                              <Badge key={index} className="bg-gray-800 text-white text-xs px-1 py-0.5">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Product info */}
                      <div className="p-4">
                        <div className="text-xs text-gray-500 uppercase mb-1 font-medium">
                          {product.category || "JEWELRY"} • {product.material || "MOISSANITE"}
                        </div>

                        <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating || 5)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.review_count || 0})</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-600">
                            ${((product.price ?? 0) / 100).toFixed(2)}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ${((product.original_price ?? 0) / 100).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Sentinel for infinite scroll – MUST sit inside the horizontal row */}
                  {hasNextPage && (
                    <div
                      ref={loadMoreRef}
                      className="flex-shrink-0 w-8 h-64 grid place-items-center text-xs text-gray-400"
                      aria-hidden
                    >
                      {isFetchingNextPage ? "Loading…" : "…"}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center w-full py-8">
                  <div className="text-gray-500">No products available at the moment</div>
                </div>
              )}
            </div>
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
